let api_key = ""

function GenCommonHeader(){
	var myHeaders = new Headers()
	myHeaders.append("Accept", "application/json")
	myHeaders.append("Authorization-Type", "v1")
	myHeaders.append("Content-Type", "application/vnd.api+json")
	myHeaders.append("Authorization", api_key)
	return myHeaders
}

// チーム一覧をメモリ上に展開
async function GetTeams(id){
	const myHeaders = GenCommonHeader()

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	const datas = {}

	await fetch("https://api.challonge.com/v2.1/tournaments/" + id + "/participants.json", requestOptions)
		.then(response => response.json())
  	.then(result => {
			// 試合を順番に処理
			result["data"].forEach((team) => {
				datas[team["id"]] = team["attributes"]["name"]
			})
		})
		.catch(error => console.log('error', error))

	return datas
}

module.exports = async function(nodecg) {
	const id = nodecg.bundleConfig.challonge_id
	api_key = nodecg.bundleConfig.challonge_key
	const router = nodecg.Router()
	const teams = await GetTeams(id)

	// 待機画面メッセージ初期化

	// 試合一覧取得
	router.get('/challonge/matches', async (req, res) => {
		var myHeaders = GenCommonHeader()

		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};

		const res_data = { datas: {} }
		let data_count = 0

		await fetch("https://api.challonge.com/v2.1/tournaments/" + id + "/matches.json", requestOptions)
		.then(response => response.json())
  	.then(result => {
			// 試合を順番に処理
			result["data"].forEach((match) => {
				// 得点を抽出
				const score = []
				match["attributes"]["points_by_participant"].forEach((score_data) => {
					score.push({
						id: score_data["participant_id"],
						score: score_data["scores"]
					})
				})

				// アプリで使いやすいように加工
				res_data["datas"]["match_" + match["attributes"]["suggested_play_order"]] = {
					id: match["id"],
					state: match["attributes"]["state"],
					round: match["attributes"]["round"],
					winner: match["attributes"]["state"] == "complete" ? teams[match["attributes"]["winner_id"]] : "",
					red: {
						id: score[0]["id"],
						team_name: score[0]["id"] ? teams[score[0]["id"]] : "",
						score: score[0]["score"]
					},
					blue: {
						id: score[1]["id"],
						team_name: score[1]["id"] ? teams[score[1]["id"]] : "",
						score: score[0]["score"]
					}
				}
				data_count++
			})
		})
		.catch(error => console.log('error', error))

		res_data["match_count"] = data_count
		res.status(200).json(res_data)
	});

	// 試合結果送信
	router.post('/challonge/record', async (req, res) => {
		const data = req["body"];
		const red_rank = data["winner"] == data["match"]["red"]["team_name"] ? 1 : 2
		const blue_rank = data["winner"] == data["match"]["blue"]["team_name"] ? 1 : 2
		const req_body = {
			data: {
				type: "Match",
				attributes: {
					state: "complete",
					match: [
						{
               participant_id: data["match"]["red"]["id"],
               score_set: data["red_score"].toString(),
               rank: red_rank,
							 advancing: red_rank == 1
            },
						{
               participant_id: data["match"]["blue"]["id"],
               score_set: data["blue_score"].toString(),
               rank: blue_rank,
							 advancing: blue_rank == 1
            }
					],
					tie: false
				}
			}
		}

		const requestOptions = {
			method: 'PUT',
			headers: GenCommonHeader(),
			body: JSON.stringify(req_body),
			redirect: 'follow'
		};
		await fetch("https://api.challonge.com/v2.1/tournaments/" + id + "/matches/" + data["match"]["id"] + ".json", requestOptions)
		.then(response => {
			if (response.ok){
				res.status(200).json({
					status: "success"
				})
			}
			else {
				res.status(500).json({
					status: "failed",
					response: response.text
				})
			}
		})
	})

	nodecg.mount('/api', router);
};

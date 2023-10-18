module.exports = function(nodecg) {
    const router = nodecg.Router();

    router.post('/scoreapi', (req, res) => {
		const data = req.body;
		const valuie = {
			red : data.score_a,
			blue : data.score_b
		}
		const Rep = nodecg.Replicant('score');
		Rep.value = valuie;
        res.send('OK!');
    });

    nodecg.mount('/api', router); // The route '/api/scoreapi` is now available
};
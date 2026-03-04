# 使い方

「WORKSPACE」で画面管理を行い、「GRAPHICS」からリンクをコピーして、OBSのブラウザソースとして取り込むことで動かします。
GRAPHICSは試合画面用の「INDEX.HTML」と待機画面用の「WAITING.HTML」があります。

## ScoreEdit

スコアを編集します。「+/-/Reset」ボタンでスコアを編集し、「結果を送信する」ボタンでChallongeにスコアを送信します。
後述の「PlayerSettings」から選手名を反映している場合は、結果送信機能は使用できません。

## Match Select

Challongeから試合を選んで、画面に選手名を反映します。「更新」ボタンで一覧を再取得できます。
すでに結果が入っている試合は背景が緑、まだ結果が入っていない試合は背景が水色になっています。

## PlayerSettings

Challongeから選手名を反映できない際の予備機能。
RedとBlueをそれぞれ選択し、「Update」ボタンを押下することで画面に反映される。

## Tournament View

Challongeのトーナメントを表示します。わざわざChallongeを開かなくても良いように置いてます。

## WaitingEdit

待機画面の右下のメッセージを更新できます。「更新」ボタンで反映されます。
メッセージが長いと見切れるので、目安として全角文字だと23文字までにするほうがいいです。

# 起動方法

* nodejsをインストール
  * 開発はv22.14.0で開発
* nodecgをインストール
  * npm install --global nodecg@latest
* cfg配下に以下のファイルを作成（設定ファイルの内容は「設定」を参照）
  * bundle-1.yml
  * nodejs.yml
* サーバー起動
  * npx nodecg start

# 設定

## bundle-1.yml

* challonge_key
ChallongeのAPI v1 Keyを貼り付け
* challonge_id
対象のトーナメントのIDを記述
* players
Challongeからプレイヤーの反映ができない時の予備
リスト形式でプレイヤー名を記述
* round_name
⚪︎回戦、決勝などの名前をつけるマスタ。
「round_[番号]: "名前"」の形式で記述
つけない場合は自動でつきます。

## nodejs.yml

* host
ホスト名
* port
ポート番号
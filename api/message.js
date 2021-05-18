// 外部インポート
const AssistantV1 = require('ibm-watson/assistant/v1');
const IamAuthenticator = require('ibm-watson/auth');

// 内部インポート
const config = require('../config/config');

// Watson Assistant (V1)の初期化処理
// see: https://cloud.ibm.com/apidocs/assistant/assistant-v1?code=node
//
// 初期化は、1回のみ実施するため、module.exportsの外で実装
//
const assistant = new AssistantV1({
    version: config.watson.version,
    authenticator: new IamAuthenticator({
        apikey: config.watson.apikey,
    }),
    serviceUrl: config.watson.serviceUrl
});

// 
// 会話用 API
// Watson Assistantと会話処理
// 
// @method require POST       : POST 通信
// @param  require message    : ユーザメッセージ(必須)
// @param  require context    : コンテキスト(必須)
// @return                    : Watson Assistant Response
//
module.exports = function (req, res) {
    // ユーザメッセージがない場合、500エラーを返す
    if (!req.body.message) {
        res.status(500).send('Missing message');
    }
    // コンテキストがない場合、500エラーを返す
    if (!req.body.context) {
        res.status(500).send('Missing context');
    }

    // リクエストパラメータ
    let param = {
        workspaceId: config.watson.workspaceId,
        input: { 'text': req.body.message },
        context: req.body.context
    };


    // Wason Assistant のmessage apiをcallする
    assistant.message(param)
        .then(ret => {　// 正常に通信できた場合
            // 結果をコンソールに出力する
            console.log(JSON.stringify(ret.result, null, 2));
            // クライアント側に、結果を返す
            return res.send(ret);
        })
        .catch(err => {　// 通信エラーの場合
            // エラーをコンソールに出力する
            console.log(err)
            // クライアント側に、結果を返す
            return res.send(err);
        });

}
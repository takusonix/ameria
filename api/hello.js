// 外部インポート
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

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
// 初回挨拶用 API
// Watson Assistantが発行するcontextとuser_idを取得するため
// 
// @method require GET    : GET 通信
// @param  option user_id : ユーザID（前回のIDを再利用する場合）
// @return                : Watson Assistant Response
//
module.exports = function (req, res) {
    // Watson Assistant リクエストパラメータ
    let param = {
        workspaceId: config.watson.workspaceId,
        input: { 'text': 'こんにちは' }
    };

    // user_idの指定がある場合
    if (req.query.user_id) {
        const context = {
            metadata: {
                user_id: req.query.user_id
            }
        };
        param.context = context;
    }

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
};
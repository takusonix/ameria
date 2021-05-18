// 外部インポート
// なし

// 内部インポート
const indexApi = require('./index');
const helloApi = require('./hello');
const messageApi = require('./message');
const postApi = require('./post');

//
// API 設定
//
module.exports = function (app) {

    app.get('/hello', helloApi); // 初回挨拶用
    app.get('/message', messageApi);　// 2回目会話用

    // for debug
    app.get('/', indexApi);
    app.post('/post', postApi);

}
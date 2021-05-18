// 外部インポート
const express = require('express');
// 内部インポート
const api = require('./api/api');
const config = require('./config/config');

// Expressの初期化
const app = express();
// post通信、JSONのエンコード設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ./api/api.jsの呼び出し
api(app);

// HTTP サーバの起動 
app.listen(config.server.port, () => console.log('Example app listening on port 3000!'))
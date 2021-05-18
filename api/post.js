// 
// POST 通信サンプルソース
//
// curl -X POST -d '{\"message\":\text\"}' http://localhost:3000/post"
//
module.exports = function (req, res) {
    console.log(req.body.message);
    console.log(JSON.stringify(req.body, null, 2));
    res.send(req.body);
}
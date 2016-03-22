var express = require('express');
var router = express.Router();
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/table', function(req, res, next) {
    try {
        if (!req.body.obj)
            res.json(400, {err:'Please post a JSON object to req.body.obj!',result:null});
        else {
            var _json = JSON.parse(req.body.obj);
            var output = objectToMarkdownTable.convertObjectToMarkdown(_json, null);
            res.status(200).send({err:null,result:output});
            //res.render('marked', { result:output });
        }
    } catch (err) {
        res.json(400, {"err":err.message, "result":null});
    }
});

router.post('/list', function(req, res, next) {
    
})

module.exports = router;
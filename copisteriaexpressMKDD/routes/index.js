const session = require('express-session');
var express = require('express');
var router = express.Router();

let impresora1 = [];
let impresora2 = [];
let impresora3 = [];


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session', async (req, res, next) => {
  req.session.printers = { impresora1, impresora2, impresora3 };
});


module.exports = router;

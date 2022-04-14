var express = require('express');
const animal_controlers= require('../controllers/animal');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  router.get('/', animal_controlers.animal_view_all_Page );
  res.render('animal', { title: 'Search Results Animal' });
});

module.exports = router;


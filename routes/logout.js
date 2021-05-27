var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
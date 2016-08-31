var router = require("./router"),
    group_ctr = require('../../controllers/group');

router.get('/group/market_list', function(req, res, next) {
    res.render('group/market_list', {
        title: '首页',
        pageName: '平台页'
    });
});

module.exports = router;
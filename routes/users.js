var express = require('express');
var router = express.Router();
var model = require('../model');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//注册接口
router.post('/regist', (req, res) => {
        let data = {
            username: req.body.username,
            password: req.body.password,
            password2: req.body.password2
        }
        if (data.password === data.password2) {
            model.connect(function(db) {
                db.collection('users').insertOne(data, (err, ret) => {
                    if (err) {
                        console.log(注册失败)
                        res.redirect('/regist')
                    } else {
                        res.redirect('/login')
                    }
                })
            })
        } else {
            res.redirect('/regist')

        }
        //数据校验。。。

    })
    //登录接口
router.post('/login', (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
    }
    model.connect(function(db) {
        db.collection('users').find(data).toArray(function(err, docs) {
            if (err) {
                res.redirect('/login')
            } else {
                if (docs.length > 0) {
                    //d登录成功，进行用户名session存储
                    req.session.username = data.username
                    res.redirect('/')
                } else {
                    res.redirect('/')
                }
            }

        })
    })
    console.log(data)
})

//退出登录,清空session
router.get('/logout', (req, res) => {
    req.session.username = null
    res.redirect('/login')
})

module.exports = router;
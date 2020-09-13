const express = require('express');
const router = express.Router();
const fs = require('fs');
const image = require("imageinfo");
var path = require('path');
let uploadimg = require('../controllers/upload');

router.post('/api/uploadimg',uploadimg.img,function (req,res,next) {
    res.send(req.files[0].path);
});

/*
* 返回指定路径下所有图片
* */
router.get('/api/files/getImgs', function(req, res, next) {
    let acceptableMime = ['jpeg', 'png', 'jpg', 'gif'];
    //递归指定文件夹
    function deep(dir) {
        const arr = fs.readdirSync(path.join(__dirname, dir))
        arr.forEach(item => {
            //判断文件类型
            if(isImage(item)) {
                list.push('http://' + req.headers.host + dir.replace('../','/') + item)
                const itemPath = path.join(__dirname, dir + item);
                //判断是否为文件夹，用户遍历子级文件夹
                const isDir = fs.statSync(itemPath).isDirectory()
                if (isDir) {
                    const temp = dir + item + '/'
                    deep(temp)
                }
            }
        })
    }
    let list = []
    deep('../uploads/photo/', list)
    return res.send(list);
});

function isImage(imgname) {
    //获取最后一个.的位置
    var index= imgname.lastIndexOf(".");
    //获取后缀
    var ext = imgname.substr(index+1);
    //限制类型
    let Mime = ['jpeg', 'png', 'jpg', 'gif'];
    if(Mime.indexOf(ext) !== -1) {
        return true;
    }else {
        return false;
    }
}

module.exports = router;
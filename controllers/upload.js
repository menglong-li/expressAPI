let multer = require('multer');//文件上传
let multerObj = multer({dest:'./uploads'});

let path = '';

//设置保存规则
var storage = multer.diskStorage({
    //destination：字段设置上传路径，可以为函数
    destination: function(req, file, cb) {
        cb(null, './uploads/' + path);
    },

    //filename：设置文件保存的文件名
    filename: function(req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length -1]);
    }
})

//设置过滤规则（可选）
var imageFilter = function(req, file, cb){
    let acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    //微信公众号只接收上述四种类型的图片
    if(acceptableMime.indexOf(file.mimetype) !== -1){
        path = 'photo';
        cb(null, true)
    }else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false)
    }
}

//设置过滤规则（可选）
var zipFilter = function(req, file, cb){
    let acceptableMime = ['application/zip']
    //微信公众号只接收上述四种类型的图片
    if(acceptableMime.indexOf(file.mimetype) !== -1){
        path = 'zip';
        cb(null, true)
    }else{
        cb(null, false)
    }
}

//设置限制（可选）
let imageLimit = {
    fileSize: 1024 * 10000
}

//创建 上传图片 实例
let imageUploader = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: imageLimit
}).array('photo', 1);//array(与表单input的name一致，多张图片数量)

//创建 上传压缩包 实例
let zipUploader = multer({
    storage: storage,
    fileFilter: zipFilter,
    limits: {fieldSize: '10MB'}
}).single('zip');//array(与表单input的name一致，多张图片数量)


let Uploader = {
    img: imageUploader,
    zip: zipUploader
}

module.exports = Uploader;
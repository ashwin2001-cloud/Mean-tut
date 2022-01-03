const multer= require('multer');

const MIME_TYPE_MAP= {
  //For mimetype 'image/png', add 'png' extension; and so on
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

//middleware logic for Multer
const storage= multer.diskStorage({
  destination: (req, file, cb)=>{
    const isValid= MIME_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid Mime Type");
    if(isValid){
      error= null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb)=>{
    //const name does not give file extension, so we use MIME_TYPE_MAP
    const name= file.originalname.toLowerCase().split(' ').join('-');
    const ext= MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

module.exports= multer({storage: storage}).single('image');

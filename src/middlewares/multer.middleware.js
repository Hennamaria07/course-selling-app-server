import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    console.log(file)
  },
});

const upload = multer({ storage: storage });

export default upload;

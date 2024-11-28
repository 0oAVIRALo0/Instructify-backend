import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    } 

    cb(null, "public/videos")
  },
  filename: (req, file, cb) => { 
    cb(null, Date.now() + "-" + file.originalname)
  }
})

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);

    if (ext !== ".mp4" && ext !== ".webm" && ext !== ".mkv") {
      return cb(new Error("Only video files are allowed"));
    }
    
    cb(null, true);
  }
});
const File = require("../models/fileModel");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadsDir = path.join(__dirname, "../uploads", "projects");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 15 }, // Limit file size to 15MB
});

const uploadFile = upload.single("file");
const createFile = async (req, res) => {
  try {
    const { name, subject } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const fileSizeInBytes = file.size;
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

    const newFile = new File({
      name,
      subject,
      file: `/uploads/projects/${file.filename}`,
      size: fileSizeInMB,
      senderid: req.user._id,
      sender: req.user.name,
    });

    await newFile.save();

    res.status(200).json({
      id: newFile._id,
      name: name,
      subject: subject,
      file: `/uploads/projects/${file.filename}`,
      size: fileSizeInMB,
      senderid: req.user._id,
      sender: req.user.name,
      checkedby: newFile.checkedby,
      checkedbyid: newFile.checkedbyid,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message, "creatfile");
  }
};

const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message, "getfile");
  }
};

const getPending = async (req, res) => {
  try {
    const { limit, offset } = req.body;
    let totalFiles;
    let files;
    
    if (req.user.role === "Teacher") {
      files = await File.find({ status: false, subject: req.user.subject })
        .skip(offset)
        .limit(limit);
      totalFiles = await File.countDocuments({
        status: false,
        subject: req.user.subject,
      });
    } else {
      files = await File.find({ status: false, senderid: req.user._id })
        .skip(offset)
        .limit(limit);
      totalFiles = await File.countDocuments({
        status: false,
        senderid: req.user._id,
      });
    }

    if (!files) {
      return res.status(400).json({ files: [], totalFiles: 0 });
    }

    res.status(200).json({ files, totalFiles });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.message, "getPending");
  }
};


const getCompleted = async (req, res) => {
  try {
    if (req.user.role === "Teacher") {
      const files = await File.find({
        status: true,
        checkedbyid: req.user._id,
      });
      res.status(200).json(files);
    } else {
      const files = await File.find({ status: true, senderid: req.user._id });
      res.status(200).json(files);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message, "getcompleted");
  }
};

module.exports = { uploadFile, createFile, getFile, getPending, getCompleted };

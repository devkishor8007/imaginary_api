const express = require("express");
const multer = require("multer");
const ImageData = require("../model/image_model");
const router = express.Router();

const FILE_MINETYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isCheckToMinType = FILE_MINETYPE[file.mimetype];
    let errorUpload = new Error("Invalid Image Upload");
    if (isCheckToMinType) {
      errorUpload = null;
    }
    cb(errorUpload, "public/myimagesupload");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const imagextension = FILE_MINETYPE[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${imagextension}`);
  },
});

const uploadSet = multer({ storage: storage });

router.get("/", async (req, res) => {
  const getData = await ImageData.find();
  res.status(200).json({ success: true, count: getData.length, data: getData });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const getData = await ImageData.findById(id);
  res.status(200).json({ success: true, data: getData });
});

router.post("/", uploadSet.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No Image is in this request");

  const fileName = req.file.filename;
  const basePathUrl = `${req.protocol}://${req.get(
    "host"
  )}/public/myimagesupload/`;
  const { name } = req.body;
  const loadImage = await ImageData.create({
    name: name,
    image: `${basePathUrl}${fileName}`,
  });
  res.status(200).json({ success: true, data: loadImage });
});

router.put("/:id", uploadSet.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No Image is in this request");

  let updateImage;
  const fileName = req.file.filename;
  const basePathUrl = `${req.protocol}://${req.get(
    "host"
  )}/public/myimagesupload/`;
  updateImage = `${basePathUrl}${fileName}`;

  const id = req.params.id;
  const updateData = await ImageData.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      image: updateImage,
    },
    {
      new: true,
    }
  );

  if (!updateData) res.status(400).send("cannot be updated");

  res.status(200).json({ success: true, data: updateData });
});

router.delete("/:id", uploadSet.single("image"), async (req, res) => {
  const id = req.params.id;
  const updateData = await ImageData.findByIdAndDelete(id);

  if (!updateData) res.status(400).send("cannot be deleted");

  res.status(200).json({ success: true, data: "delete" });
});

module.exports = router;

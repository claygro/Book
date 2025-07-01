import express from "express";
import multer from "multer";
import { BookController } from "../controllers/book.controllers.js";
//multer is used to upload image.
const router = express.Router();

let imageName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});
//creating object for bookcontroller
const bookController = new BookController();
const upload = multer({ storage: storage });
//for adding data.
router.post("/add", upload.single("image"), (req, res) => {
  bookController.addBook(req, res, imageName);
});
router.get("/read/:id", bookController.getBookById);
// router.put("/update/:id", bookController.updateBookById);
router.delete("/delete/:id", bookController.deleteBookById);
router.get("/search/all", bookController.bookSearch);
router.get("/", bookController.getBooks);
export default router;

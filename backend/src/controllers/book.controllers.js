import { Op } from "sequelize";
import BookModel from "../models/book.models.js";
import textConstant from "../constant/textConstant.js";
import urlConstant from "../constant/urlConstant.js";
export class BookController {
  async addBook(req, res, imageName) {
    try {
      const data = await BookModel.create({
        ...req.body,
        image: imageName,
      });
      if (data) {
        res.status(200).json({ success: true, message: "successfully send" });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Please first give data." });
      }
      console.log(data);
    } catch (error) {
      console.log(`error in book.routes.js file for inserting data ${error}`);
      res.status(404).json({ success: false, message: "failed to send data" });
    }
  }
  //read book data
  async getBookById(req, res) {
    const { id } = req.params;
    try {
      if (id) {
        const data = await BookModel.findByPk(id);

        data ? res.status(200).json(data) : res.status(200).json([]);
      } else {
        res
          .status(404)
          .json({ success: false, message: textConstant.BookIdIsNotProvided });
      }
    } catch (error) {
      res.status(404).json({ success: false, message: "unable to show data" });
    }
  }
  //update
  // async updateBookById(req, res) {
  //   const { id } = req.params;
  //   try {
  //     if (id) {
  //       const data = await BookModel.update(req.body, {
  //         where: {
  //           id: id,
  //         },
  //       });
  //       data[0] == 1
  //         ? res
  //             .status(200)
  //             .json({ success: true, message: "update successfully" })
  //         : res.json([]);
  //     } else {
  //       res.status(200).json({ message: textConstant.BookIdIsNotProvided });
  //     }
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "unable to update." });
  //   }
  // }
  //delete
  async deleteBookById(req, res) {
    const { id } = req.params;
    try {
      const data = await BookModel.destroy({
        where: {
          id: id,
        },
      });
      data == 1
        ? res
            .status(200)
            .json({ success: true, message: "delete successfully" })
        : res.json({ message: "already delete" });
    } catch (error) {
      res.status(200).json({ success: false, message: "unable to delete" });
    }
  }
  //book searching
  async bookSearch(req, res) {
    const { q } = req.query;
    if (q) {
      const data = await BookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        raw: true,
      });
      for (let d of data) {
        d.image = urlConstant.IMG_PATH_URL + d.image;
        console.log(d.image);
      }
      console.log(data);
      res.status(200).json(data);
    } else {
      res.json({ success: false, message: "empty query search string" });
    }
  }
  //get books
  async getBooks(req, res) {
    let { limit } = req.query;
    if (!limit) {
      limit = 20;
    }
    const data = await BookModel.findAll({
      limit: parseInt(limit),
      raw: true,
    });
    console.log(data);
    //in the below comment code we are converting the filename storein db
    //like book.jpg in to full url.
    //I write uploads because the image is uploads in uploads folder.
    // so i write this directly in frontend.
    for (let d of data) {
      d.image = urlConstant.IMG_PATH_URL + d.image;
      console.log(d.image);
    }
    res.status(200).json(data);
  }
}

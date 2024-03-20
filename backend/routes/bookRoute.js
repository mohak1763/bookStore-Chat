import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to send data to collenction
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all requied fields",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
});

// Route to get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
});

//Route to get one book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const books = await Book.findById(id);
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
});

//Route to update one book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all requied fields",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      response.status(404).json({
        message: "Book not found",
      });
    }
    return response.status(200).send({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(500).send({
      message: "Book successfully deleted",
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

export default router;

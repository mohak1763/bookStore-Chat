import express, { request, response } from "express";
import { PORT, MDBurl } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

//Middleware for handling CORS policy
//option 1: Allow Custom Origins
app.use(cors());

//option 2: Allow Custom Origin
// app.use(
//   cors({
//     origin: "http://localhost:5555/",
//     method: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN");
});

app.use("/books", bookRoute);

mongoose
  .connect(MDBurl)
  .then(() => {
    console.log("DataBase Connected");
    app.listen(PORT, () => {
      console.log(
        `App is running on ${PORT} \npage is running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Unable to Connect DataBase");
  });

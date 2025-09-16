import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middleware

//  for development purpose
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // this middleware will parse json bodies : req.body

// our simple custome middleware
// app.use((req, res, next)=>{
//     console.log(`the request method is ${req.method} and the url is ${req.url}`);

//     next(); //run the next process after console i.e middleware
// })

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// for deployment/production purpose

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // {/.*/} means any route other than notesRoutes
  app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("its port running", PORT);
  });
});

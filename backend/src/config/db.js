import mongoose from "mongoose";

// export const connectDB = () => {
//   try {
//     const conn = mongoose.createConnection(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(` MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(" Error Connecting MongoDB:", error.message);
//     
//   }
// };


export const connectDB = async () =>{

  try {
    // mongoose.connect("mongodb+srv://nidagilani2611_db_user:YVazGeypGslqAQOL@cluster0.cq0bmpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    // console.log("DB connected")
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!")
  } catch (error) {
    console.error("❌ Error Connecting to MongoDB", error);
    process.exit(1);
  }
}
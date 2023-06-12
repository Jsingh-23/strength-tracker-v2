// import mongoose from "mongoose";
// mongoose.set("strictQuery", false);

// const connectMongo = async () => mongoose.connect(
//   'mongodb+srv://jas137:karan123@strengthtrackercluster.kn0n9gm.mongodb.net/strength_tracker?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// export default connectMongo;


import mongoose from "mongoose";

const initDB = () => {
  // Dont connect to DB if already connected
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  // Connect to DB
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
};

export default initDB;
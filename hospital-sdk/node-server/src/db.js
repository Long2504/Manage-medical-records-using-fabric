import mongoose from "mongoose";

export default async function connection() {
    mongoose.set("strictQuery", true);
    mongoose.Promise = global.Promise;
    mongoose
        .connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log("Successfully connect to MongoDB."))
        .catch((err) => console.error("connection error", err));
}

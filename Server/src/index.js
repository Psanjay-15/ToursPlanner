import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:"./env"
})
console.log(process.env.PORT)
const port = process.env.PORT || 8000
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Running on port ${port} ✨`)
    })
}).catch((error) => {
    console.log("Mongo Connection falied",error)
})

const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({path: "./config/.env"})
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { connectDB } = require("./database/connectDB")
const userRouter =  require("./routes/user.routes")
const driverRouter =  require("./routes/driver.routes")
const { errorMiddleware } = require("./middlewares/error.middleware")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use("/api/user", userRouter)
app.use("/api/driver", driverRouter)


connectDB()
app.use(errorMiddleware);

module.exports =app
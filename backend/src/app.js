import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express()

app.use(cors({
    origin: ["https://insight-lens.vercel.app"],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: 'Internal server error' });
})

// import router
import userRouter from "./routes/user.routes.js"

// route declaration
app.use("/api/users", userRouter)

export { app }

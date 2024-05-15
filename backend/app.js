import express from 'express';
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: ('https://insight-lens.vercel.app/'),
    methods: ("GET", "POST"),
    credentials: true
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({extended: true, limit: "5mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: 'Internal server error' });
})

// import router
import userRouter from "./src/routes/user.routes.js"

// route declaration
app.use("/api/users", userRouter)

export { app }

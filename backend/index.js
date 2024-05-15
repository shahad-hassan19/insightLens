import connectDB from './src/db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({
    path: "./.env"
})

app.get('/', (req, res) => {
    res.send('Welcome to InsightLens!');
});

connectDB()
.then( () => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is listening at port ${process.env.PORT}`)
    })
    app.on("error", (error) => {
        console.log("Error", error)
    })
})
.catch( (err) => {
    console.log("Database connection failed!!", err)
})
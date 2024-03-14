import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    intensity: Number,
    sector: String,
    insight: String,
    url: String,
    start_year: Number,
    country: String,
    pestle: String,
    title: String,
});

export const Data = mongoose.model('Data', dataSchema);


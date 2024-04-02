import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: String,
    intensity: Number,
    insight: String,
    sector: String,
    pestle: String,
    country: String,
    url: String,
    start_year: Number,
});

export const Data = mongoose.model('Data', dataSchema);


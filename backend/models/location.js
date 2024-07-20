import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    loc_id: { type: String, required: true, unique: true },
    address: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
});

const location = mongoose.model('location', locationSchema);

export default location;

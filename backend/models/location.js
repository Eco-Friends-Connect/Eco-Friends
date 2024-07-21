import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    locId: { type: String, required: true, unique: true, index: true },
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
});

const Location = mongoose.model('location', locationSchema);

export default Location;

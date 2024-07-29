import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    address: String,
    city: String,
    state: String,
    zipCode: String,
});

const Location = mongoose.model('location', locationSchema);

export default Location;
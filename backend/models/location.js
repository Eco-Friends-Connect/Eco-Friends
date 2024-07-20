import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    org_address: String,
    org_city: String,
    org_state: String,
    org_zip: String,
    org_country: String,
});

const location = mongoose.model('location', locationSchema);

export default location;

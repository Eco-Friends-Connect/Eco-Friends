import mongoose from "mongoose";

const orgLocationSchema = new mongoose.Schema({
    org_address: String,
    org_city: String,
    org_state: String,
    org_zip: String,
    org_country: String,
});

const OrgLocation = mongoose.model('OrgLocation', orgLocationSchema);

export default OrgLocation;

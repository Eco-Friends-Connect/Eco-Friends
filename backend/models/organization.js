import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    org_name: String,
    org_description: String,
    org_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrgLocation'
    },
    org_events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrgEvent'
    }]  
});

const Organizations = mongoose.model('Organization', organizationSchema);

export default Organizations;

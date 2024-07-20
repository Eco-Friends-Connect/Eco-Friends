import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }]  
});

const Organization = mongoose.model('organization', organizationSchema);

export default Organization;

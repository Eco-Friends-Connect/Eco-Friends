import mongoose from "mongoose";

const orgEventSchema = new mongoose.Schema({
    event_name: String,
    event_description: String,
    event_date: Date,
    event_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrgLocation'
    },
    event_signups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    event_organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
});

const OrgEvent = mongoose.model('OrgEvent', orgEventSchema);

export default OrgEvent;

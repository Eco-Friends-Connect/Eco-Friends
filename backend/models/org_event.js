import mongoose from 'mongoose';

const orgEventSchema = new mongoose.Schema({
    org_event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'org_event',
        index: true
    },
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        index: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        index: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const OrgEvent = mongoose.model('org-event', orgEventSchema);

export default OrgEvent;
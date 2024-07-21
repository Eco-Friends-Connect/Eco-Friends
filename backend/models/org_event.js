import mongoose from 'mongoose';

const orgEventSchema = new mongoose.Schema({
    orgEventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'org_event',
        index: true
    },
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        index: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrgEvent = mongoose.model('org-event', orgEventSchema);

export default OrgEvent;
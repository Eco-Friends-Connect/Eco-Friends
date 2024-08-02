import mongoose from 'mongoose';

const orgBadgeSchema = new mongoose.Schema({
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        index: true
    },
    badgeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'badge',
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrgBadge = mongoose.model('org-badge', orgBadgeSchema);

export default OrgBadge;
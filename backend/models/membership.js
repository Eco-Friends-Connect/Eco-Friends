import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        index: true
    },
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        index: true
    },
    role: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;
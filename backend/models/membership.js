import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        index: true
    },
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        index: true
    },
    role: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;
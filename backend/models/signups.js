import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
    date: Date,
    status: String, // 'pending', 'approved', 'rejected'
});

const signup = mongoose.model('signup', signupSchema);

export default signup;
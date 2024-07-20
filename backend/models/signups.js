import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', index: true },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'event', index: true },
    signup_date: Date,
    status: String, // 'pending', 'approved', 'rejected'
});

const signup = mongoose.model('signup', signupSchema);

export default signup;
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', index: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event', index: true },
    signupDate: Date,
    status: String, // 'pending', 'approved', 'rejected'
});

const Signup = mongoose.model('signup', signupSchema);

export default Signup;
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    accountId: { type: String, required: true, index: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event', index: true , required: true},
    signupDate: Date,
    status: String, // 'pending', 'approved', 'rejected'
    createdAt: { type: Date, default: Date.now },
});

const Signup = mongoose.model('signup', signupSchema);

export default Signup;
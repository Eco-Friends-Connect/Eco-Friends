import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
    date: Date,
    status: String,
});

const signup = mongoose.model('signup', signupSchema);

export default signup;
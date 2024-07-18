import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_first_name: String,
    user_last_name: String,
    user_email: String,
    user_password: String,
    user_birth_date: Date,
    user_is_org: { type: Boolean, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
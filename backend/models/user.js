import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    accountId: {type: String, required: true, unique: true, index: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    birthDate: {type: Date, required: true},
});

const User = mongoose.model('user', userSchema);

export default User;

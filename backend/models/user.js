import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    account_id: {type: String, required: true, unique: true},
    org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'organization' },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    birth_date: {type: Date, required: true},
    is_org: { type: Boolean, required: true },
});

const User = mongoose.model('user', userSchema);

export default User;

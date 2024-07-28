import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    }, 
    description: String,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
        index: true
    }
});

const Organization = mongoose.model('organization', organizationSchema);

export default Organization;

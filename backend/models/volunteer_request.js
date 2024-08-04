import mongoose from "mongoose";

const VolunteerRequestSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: Date, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event', index: true, required: true },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'organization', index: true, required: true },
    status: String, // 'pending', 'approved', 'rejected'
    isUser: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now },
});

const VolunteerRequest = mongoose.model('volunteer-request', VolunteerRequestSchema); 

export default VolunteerRequest;
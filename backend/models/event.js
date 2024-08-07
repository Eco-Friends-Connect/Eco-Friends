import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    locId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
        index: true
    },
    badge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'badge',
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('event', eventSchema);

export default Event;

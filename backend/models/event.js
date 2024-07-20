import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    loc_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    },
    badge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'badge'
    },
});

const event = mongoose.model('event', eventSchema);

export default event;

import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId,ref: 'event', index: true}, // managed by server
    title: {type: String,required: true},
    description: {type: String},
    imgStorageRef: {type: String}, // managed by server
    criteria: {type: String},
    createdAt: {type: Date,default: Date.now}
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
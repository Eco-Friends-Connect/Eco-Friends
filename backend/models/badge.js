import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId,ref: 'event', index: true},
    title: {type: String,required: true},
    description: {type: String},
    imageUrl: {type: String},
    criteria: {type: String},
    createdAt: {type: Date,default: Date.now}
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
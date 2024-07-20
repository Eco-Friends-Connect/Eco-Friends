import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    event_id: {type: mongoose.Schema.Types.ObjectId,ref: 'event', index: true},
    title: {type: String,required: true},
    description: {type: String},
    image: {type: String},
    criteria: {type: String},
    created_at: {type: Date,default: Date.now}
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
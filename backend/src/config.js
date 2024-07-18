import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';


dotenv.config();
// mongodb+srv://dinaolmelak:<password>@cluster0.91fzntr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
console.log(process.env.REACT_APP_MONGO_URI);

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.REACT_APP_MONGO_URI}`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
};

export default connectDB;


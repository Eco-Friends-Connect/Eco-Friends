import express from 'express';
import User from '../../models/user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    const { user_first_name, user_last_name, user_email, user_password, user_birth_date } = req.body;
    console.log(req.body);
    const user = new User({
        user_first_name,
        user_last_name,
        user_email,
        user_password,
        user_birth_date,
        user_is_org: false,
    });

    try {
        await user.save();
        res.send('User registered');
    } catch (error) {
        res.send(error);
    }
}
);
        

export default router;

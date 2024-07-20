import express from 'express';
import User from '../../models/user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, birth_date } = req.body;
    //TODO: replace with actual account id from firebase auth
    const acountId = 'Ck1XsPLJQ3WB8YhZ7Dh2aKmfsJx1'; 
    console.log(req.body);
    const user = new User({
        account_id: acountId,
        first_name,
        last_name,
        email,
        birth_date,
        user_is_org: false
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

import express from 'express';
import Org from '../models/org.js';
import User from '../models/user.js';

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
        user_is_org: true,
    });

    try {
        await user.save();
        res.send('User registered');
    } catch (error) {
        res.send(error);
    }
}
);


router.post('/create', async (req, res) => {
    const { org_name, org_description } = req.body;
    const org = new Org({
        org_name,
        org_description
    });

    try {
        await org.save();
        res.send('Organization created');
    } catch (error) {
        res.send(error);
    }
}
);

export default router;

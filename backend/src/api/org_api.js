import express from 'express';
import organization from '../../models/organization.js';
import OrgLocation from '../../models/location.js';
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
        user_is_org: true,
    });

    try {
        await user.save();
        res.send('Org User registered');
    } catch (error) {
        res.send(error);
    }
}
);



router.post('/create-org', async (req, res) => {
    const { org_name, org_description, org_address, org_city, org_state,org_zip,org_country } = req.body;
    console.log("create-org",req.body);
    const newOrgLocation = new OrgLocation({
        org_address,
        org_city,
        org_state,
        org_zip,
        org_country,
    });
    const org = new organization({
        org_name,
        org_description,
        org_location: newOrgLocation,
    });

    try {
        await newOrgLocation.save();
        await org.save();
        res.send('Organization created');
    } catch (error) {
        res.send(error);
    }
}
);

export default router;

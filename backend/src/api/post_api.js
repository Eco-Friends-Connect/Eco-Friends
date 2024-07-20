import express from 'express';
import User from '../../models/user.js';
import Organization from '../../models/organization.js';
import Membership from '../../models/membership.js';
import Location from '../../models/location.js';
import Badge from '../../models/badge.js';
import Event from '../../models/event.js';
import Signup from '../../models/signups.js';
import OrgEvent from '../../models/org_event.js';

const router = express.Router();

router.post('/create-user', async (req, res) => {
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
    });

    try {
        await user.save();
        res.send('User registered');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-org', async (req, res) => {
    const { org_name, org_description, org_address, org_city, org_state, org_zip, org_country } = req.body;
    console.log("create-org", req.body);
    const newOrgLocation = new Location({
        org_address,
        org_city,
        org_state,
        org_zip,
        org_country,
    });
    const org = new Organization({
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

router.post('/create-event', async (req, res) => {
    const { event_name, event_description, event_date, event_time, event_location, event_org } = req.body;
    console.log("create-event", req.body);
    const newEventLocation = new Location({
        event_location,
    });
    const event = new Event({
        event_name,
        event_description,
        event_date,
        event_time,
        event_location: newEventLocation,
        event_org,
    });

    try {
        await newEventLocation.save();
        await event.save();
        res.send('Event created');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-badge', async (req, res) => {
    const { badge_name, badge_description, badge_image } = req.body;
    console.log("create-badge", req.body);
    const badge = new Badge({
        badge_name,
        badge_description,
        badge_image,
    });

    try {
        await badge.save();
        res.send('Badge created');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-signup', async (req, res) => {
    const { signup_event, signup_user } = req.body;
    console.log("create-signup", req.body);
    const signup = new Signup({
        signup_event,
        signup_user,
    });

    try {
        await signup.save();
        res.send('Signup created');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-org-event', async (req, res) => {
    const { org_event_org, org_event_event } = req.body;
    console.log("create-org-event", req.body);
    const org_event = new OrgEvent({
        org_event_org,
        org_event_event,
    });

    try {
        await org_event.save();
        res.send('Org Event created');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-membership', async (req, res) => {
    const { membership_user, membership_org } = req.body;
    console.log("create-membership", req.body);
    const membership = new Membership({
        membership_user,
        membership_org,
    });

    try {
        await membership.save();
        res.send('Membership created');
    } catch (error) {
        res.send(error);
    }
}
);

export default router;
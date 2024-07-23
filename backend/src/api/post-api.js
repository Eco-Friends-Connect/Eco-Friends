import express from 'express';
import User from '../../models/user.js';
import Organization from '../../models/organization.js';
import Membership from '../../models/membership.js';
import Location from '../../models/location.js';
import Badge from '../../models/badge.js';
import Event from '../../models/event.js';
import Signup from '../../models/signups.js';
import OrgEvent from '../../models/org_event.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const router = express.Router();
// create a new user
router.post('/create-user', async (req, res) => {
    const { firstName, lastName, email, password, birthDate } = req.body;
    const auth = req.auth;

    createUserWithEmailAndPassword(auth, email, password ).then((userCredential) => {
        const user = userCredential.user;
        const newUser = new User({
            accountId: user.uid,
            firstName,
            lastName,
            email,
            birthDate,
        });
    
        try {
            newUser.save();
            res.send('User registered');
        } catch (error) {
            res.send(error);
        }
    }).catch((error) => {
        console.log(error);
    });
    
}
);

// login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const auth = req.auth;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log("login email:", user.email);
        res.send(user);
    }).catch((error) => {
        console.log(error);
    });
}
);

router.post('/create-org', async (req, res) => {
    const { name, description, address, city, state, zipCode } = req.body;
    console.log("create-org", req.body);
    const newOrgLocation = new Location({
        address,
        city,
        state,
        zipCode,
    });
    const org = new Organization({
        name,
        description,
        orgLocation: newOrgLocation,
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
    const { locId, title, description, deadline, badge } = req.body;
    console.log("create-event", req.body);
    const event = new Event({
        locId,
        title,
        description,
        deadline,
        badge,
    });

    try {
        await event.save();
        res.send('Event created');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-badge', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    console.log("create-badge", req.body);
    const badge = new Badge({
        name,
        description,
        imageUrl,
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
    const { accountId, eventId, status } = req.body;
    console.log("create-signup", req.body);
    const signup = new Signup({
        accountId,
        eventId,
        signupDate: new Date(),
        status,
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
    const { orgId, eventId } = req.body;
    console.log("create-org-event", req.body);
    const orgEvent = new OrgEvent({
        orgId,
        eventId,
    });

    try {
        await orgEvent.save();
        res.send('Org Event created');
    } catch (error) {
        res.send(error);
    }
}
);

router.post('/create-membership', async (req, res) => {
    const { orgId, accountId, role } = req.body;
    console.log("create-membership", req.body);
    const membership = new Membership({
        accountId,
        orgId,
        role,
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
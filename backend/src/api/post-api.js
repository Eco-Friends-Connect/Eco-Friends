import express from 'express';
import User from '../../models/user.js';
import Organization from '../../models/organization.js';
import Membership from '../../models/membership.js';
import Location from '../../models/location.js';
import Badge from '../../models/badge.js';
import Event from '../../models/event.js';
import Signup from '../../models/signups.js';
import OrgEvent from '../../models/org_event.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { get } from 'mongoose';

const router = express.Router();
// create a new user
router.post('/create-user', async (req, res) => {
    const { firstName, lastName, email, password, birthDate } = req.body;
    const auth = req.auth;

    try {
        createUserWithEmailAndPassword(auth, email, password ).then((userCredential) => {
            const user = userCredential.user;
            const newUser = new User({
                accountId: user.uid,
                firstName,
                lastName,
                email,
                birthDate,
            });
            newUser.save();
            console.log('user : ', user.email );
            return res.status(201).json({
                status: 'success',
                message: 'User created',
                data: {
                    accountId: user.uid,
                    firstName,
                    lastName,
                    email,
                    birthDate,
                },
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 'fail',
            message: 'User not created',
            error: error,
        });
    }


}
);

// login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const auth = req.auth;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log("login email:", user.email);
        return res.status(200).send({
            status: 'success',
            message: 'User logged in',
            data: {
                email: user.email,
            },
        });
    }).catch((error) => {
        console.log(error);
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
            error: error,
        });
    });
}
);
// logout a user
router.post('/logout', async (req, res) => {
    const auth = getAuth();
    const user = auth.currentUser;
    auth.signOut().then(() => {
        console.log(user.email);
        return res.status(200).send({
            status: 'success',
            message: 'User logged out',
            data: {
                email: user.email,
            },
        });
    }).catch((error) => {
        console.log(error);
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged out',
            error: error,
        });
    });
}
);

router.post('/create-org', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null || auth.currentUser.uid === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    //if current user is a member of an organization, return error
    const currUser = auth.currentUser;
    const membershipAlready = await Membership.findOne({ accountId: currUser.uid.toString() });
    if(membershipAlready !== null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User already a member of an organization',
        });
    }
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
        location: newOrgLocation,
    });

    // add membership for the user
    const user = auth.currentUser;
    const membership = new Membership({
        accountId: user.uid,
        orgId: org._id,
        role: 'admin',
    });
    
    try {
        await newOrgLocation.save();
        await org.save();
        await membership.save();
        res.status(201).send({
            status: 'success',
            message: 'Organization created',
            data: {
                name,
                description,
                address,
                city,
                state,
                zipCode,
            },
        });
        
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Organization not created',
            error: error,
        });
    }
}
);

router.post('/create-event', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
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
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
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
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
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
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
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
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
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
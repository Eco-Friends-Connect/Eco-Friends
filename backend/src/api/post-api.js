import express from 'express';
import User from '../../models/user.js';
import Organization from '../../models/organization.js';
import Membership from '../../models/membership.js';
import OrgBadge from '../../models/org_badge.js';
import Location from '../../models/location.js';
import Badge from '../../models/badge.js';
import Event from '../../models/event.js';
import Signup from '../../models/signups.js';
import OrgEvent from '../../models/org_event.js';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import multer from 'multer';
const multerEngine = multer.memoryStorage();
const upload = multer({ storage: multerEngine});

const router = express.Router();

// create a new user  ✅
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

// login a user ✅
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
// logout a user ✅
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
// create a new organization ✅
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
// create a new event ✅
router.post('/create-event', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    
    const {title, description, deadline, badge } = req.body;
    console.log("create-event", req.body);
    const event = new Event({
        title,
        description,
        deadline,
        badge,
    });
    const membership = await Membership.findOne({ accountId: auth.currentUser.uid });
    if(membership === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not a member of an organization',
        });
    }
    const orgId = membership.orgId;
    const newOrgEvent = new OrgEvent({
        orgId: orgId,
        eventId: event._id,
    });
    try {
        await newOrgEvent.save();
        await event.save();
        res.status(201).send({
            status: 'success',
            message: 'Event created',
            data: {
                eventId: event._id,
                title,
                description,
                deadline,
                badge,
            },
        });
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Event not created',
            error: error,
        });
    }
}
);
// add badge to an event ✅
router.post('/add-badge-to-event', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    const { eventId, badgeId } = req.body;
    const eventFound = await Event.findOne({ _id: eventId });
    const badgeFound = await Badge.findOne({ _id: badgeId });
    if(eventFound === null || badgeFound === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'Event or Badge not found',
        });
    }
    try {
        eventFound.badge = badgeId;
        await eventFound.save();
    } catch (error) {
        return res.status(400).send({
            status: 'fail',
            message: 'Badge not added to event',
            error: error,
        });
    }
    return res.status(200).send({
        status: 'success',
        message: 'Badge added to event',
        data: {
            eventId,
            badgeId,
        },
    });
}
);
// create a new badge ✅
router.post('/create-badge', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    console.log("create-badge", req.body);
    const {title,description,criteria,imgStorageRef} = req.body;
    const badge = new Badge({
        title,
        description,
        criteria,
        imgStorageRef,
    });

    const membership = await Membership.findOne({ accountId: auth.currentUser.uid });
    if(membership === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not a member of an organization',
        });
    }
    const orgId = membership.orgId;
    const orgBadge = await Badge.findOne({ title:title });
    if(orgBadge !== null) {
        return res.status(400).send({
            status: 'fail',
            message: 'Badge already exists',
        });
    }
    const newOrgBadge = new OrgBadge({
        badgeId: badge._id,
        orgId: orgId,
    });
    try {
        await badge.save();
        await newOrgBadge.save();
        res.status(201).send({
            status: 'success',
            message: 'Badge created',
            data: {
                badgeId: badge._id,
                title,
                description,
                criteria,
                imgStorageRef,
            }
        });
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Badge not created',
            error: error,
        });
    }
    
}
);

// upload a badge image ✅
router.post('/upload-badge-image', upload.single('image'), async (req, res) => {
    const auth = getAuth();
    const storage = getStorage();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    const reqImage = req.file;
    if(reqImage !== undefined) {
        const metadata = {
            contentType: 'image/png',
        };
        const storageRef = ref(storage, 'org/badgeImgs/' + reqImage.originalname);
        const uploadTask = uploadBytesResumable(storageRef, reqImage.buffer, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                let msg = '';
                switch (error.code) {
                    case 'storage/unauthorized':
                        msg = 'User does not have permission to access the object';
                        break;
                    case 'storage/canceled':
                        msg = 'User canceled the upload';
                        break;
                    case 'storage/unknown':
                        msg = 'Unknown error occurred, inspect error.serverResponse';
                        break;
                }
                console.log(msg);
                return res.status(400).send({
                    status: 'fail',
                    message: msg,
                    error: error,
                });
                
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                return res.status(200).send({
                    status: 'success',
                    message: 'Badge image uploaded',
                    data: {
                        image: reqImage.originalname,
                        imageRef: storageRef.fullPath,
                        url: downloadUrl,
                    },
                });
            }
        );
    }
});

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
        status, // pending, approved, denied
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
    // check if user is a member of an organization
    const membership = await Membership.findOne({ accountId: auth.currentUser.uid });
    if(membership === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not a member of an organization',
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
// create a new membership ✅
router.post('/create-membership', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    const userMembership = await Membership.findOne({ accountId: auth.currentUser.uid });
    if(userMembership === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not a member of an organization',
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
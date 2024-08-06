import express from 'express';
import User from '../../models/user.js';
import Organization from '../../models/organization.js';
import Membership from '../../models/membership.js';
import OrgBadge from '../../models/org_badge.js';
import Location from '../../models/location.js';
import Badge from '../../models/badge.js';
import Event from '../../models/event.js';
import Signup from '../../models/signups.js';
import VolunteerRequest from '../../models/volunteer_request.js';
import OrgEvent from '../../models/org_event.js';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
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
        const membership = Membership.findOne({ accountId: user.uid });
        if(membership === null) {
            return res.status(200).send({
                status: 'success',
                message: 'User logged in',
                data: {
                    accountId: user.uid,
                    email: user.email,
                    isOrg: false,
                },
            });
        } 
        return res.status(200).send({
            status: 'success',
            message: 'User logged in',
            data: {
                accountId: user.uid,
                email: user.email,
                isOrg: true,
            },
        });
        
    }).catch((error) => {
        console.log(error);
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
            error: error,
            errorMessage: error.message,
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
    const membership = new Membership({
        accountId: auth.currentUser.uid,
        orgId: org._id,
        role: 'admin',
    });
    
    try {
        await newOrgLocation.save();
        await org.save();
        await membership.save();
        return res.status(201).send({
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
        return res.status(400).send({
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

// create a volunteer request ✅
router.post('/create-volunteer-request', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    console.log("create-volunteer-request", req.body);
    const membership = await Membership.findOne({ accountId: auth.currentUser.uid });
    if(membership === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not a member of an organization',
        });
    }
    const { firstName, lastName, email, birthDate, eventId, status, isUser } = req.body;
    const orgId = membership.orgId;
    const volunteer = new VolunteerRequest({
        firstName,
        lastName,
        email,
        birthDate,
        eventId,
        orgId,
        isUser,
        status, // pending, approved, denied
    });

    try {
        await volunteer.save();
        return res.status(201).send({
            status: 'success',
            message: 'Volunteer Request created',
            data: {
                volunteerId: volunteer._id,
                firstName,
                lastName,
                email,
                birthDate,
                eventId,
                orgId,
                status,
                isUser,
            },
        });
    } catch (error) {
        return res.status(400).send({
            status: 'fail',
            message: 'Volunteer Request not created',
            error: error,
        });
    }

}
);

// Approve a volunteer request
router.post('/approve-volunteer-request', async (req, res) => {
    const auth = getAuth();
    const adminAuth = getAdminAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    const membership = await Membership.findOne({ accountId: auth.currentUser.uid });
    if(membership === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not a member of an organization',
        });
    }
    const { volunteerId } = req.body;
    console.log("approve-volunteer-request", req.body);
    let volunteer = await VolunteerRequest.find({ _id: volunteerId });
    volunteer = volunteer[0];
    if(volunteer === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'Volunteer Request not found',
        });
    }
    volunteer.status = 'approved';
    console.log("volunteer", volunteer);
    let userRecord;
    if(!volunteer.isUser) {
        userRecord = await adminAuth.createUser({
            email: volunteer.email,
            emailVerified: false,
            password: 'password',
            displayName: volunteer.firstName + ' ' + volunteer.lastName,
            disabled: false,
        }).catch((error) => {
            console.log('Error creating new user:', error);
            return res.status(400).send({
                status: 'fail',
                message: 'User not created',
                error: error,
            });
        });
        // add user to user collection
        try{

            const newUser = new User({
                accountId: userRecord.uid,
                firstName: volunteer.firstName,
                lastName: volunteer.lastName,
                email: volunteer.email,
                birthDate: volunteer.birthDate,
            });
            await newUser.save();
            await VolunteerRequest.updateOne({ _id: volunteerId }, volunteer);
        } catch (error) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not created',
                error: error,
            });
        }
        // send password reset email
        try{
            await sendPasswordResetEmail(auth, volunteer.email).then(() => {
                console.log('Successfully sent password reset email:', volunteer.email);
            });

            console.log('Password reset email sent to user:', volunteer.email);

        } catch (error) {
            console.log('Error sending password reset email:', error);
            return res.status(400).send({
                status: 'fail',
                message: 'Password reset email not sent',
                error: error,
            });
        }
    } else {
        userRecord = await adminAuth.getUserByEmail(volunteer.email).catch((error) => {
            console.log('Error getting user by email:', error);
            return res.status(400).send({
                status: 'fail',
                message: 'User not found',
                error: error,
            });
        });
    }
    // signup user for event
    const signup = new Signup({
        accountId: userRecord.uid,
        eventId: volunteer.eventId,
        signupDate: new Date(),
        status: 'approved',
    });
    try {
        await signup.save();
    } catch (error) {
        console.log('Successfully created new user:', userRecord.uid);
        return res.status(200).send({
            status: 'success',
            message: 'Volunteer Request approved',
            data: {
                volunteerId,
            },
        });
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
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

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("login email:", user.email);
        
        const membership = await Membership.findOne({ accountId: user.uid });
        if (!membership) {
            console.log("User is not an org");
        }
        
        const users = await User.findOne({ accountId: user.uid });
        if (!users) {
            return res.status(404).send({
                status: 'error',
                message: 'User not found',
            });
        }

        console.log("First Name:", users.firstName);

        // Get the Firebase ID token
        const token = await user.getIdToken();

        res.status(200).send({
            status: 'success',
            message: 'User logged in',
            data: {
                accountId: user.uid,
                email: users.email,
                isOrg: membership ? true : false,
                token: token,
                firstName: users.firstName,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
});


const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const auth = getAuth();
    
    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'No token provided',
        });
    }

    try {
        const decodedToken = await auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send({
            status: 'error',
            message: 'Invalid token',
        });
    }
};

// Use the middleware for protected routes
router.use('/protected-route', verifyToken, (req, res) => {
    // Handle the protected route request
    res.status(200).send({
        status: 'success',
        message: 'Protected route accessed',
        data: req.user,
    });
});
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

async function uploadImgToFirebase(image) {
    const storage = getStorage();
    const metadata = {
        contentType: 'image/png',
    };
    const storageRef = ref(storage, `org/badgeImgs/` + image.originalname);
    const uploadTask = uploadBytesResumable(storageRef, image.buffer, metadata);
    
    try {
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        return {
            imgUrl: downloadURL,
            imgStorageRef: storageRef.fullPath,
        };
    } catch (error) {
        console.log('Error uploading image:', error);
        throw error;
    }
}
// upload a badge image ✅
router.post('/upload-badge-image', upload.single('image'), async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not logged in',
        });
    }
    const reqImage = req.file;
    // console.log("upload-badge-image", reqImage);
    if(reqImage === undefined || reqImage === null) {
        console.log("No image to upload", reqImage);
        return res.status(400).send({
            status: 'fail',
            message: 'No image to upload',
        });
    }
    try {
        const downloadURL = await uploadImgToFirebase(reqImage);
        const badgeId = req.body.badgeId;
        if(badgeId === undefined || badgeId === null) {
            console.log("Badge not provided");
            return res.status(400).send({
                status: 'fail',
                message: 'Badge not provided',
            });
        }
        const badge = await Badge.findOne({ _id: badgeId });
        if(badge === null) {
            console.log("Badge not found");
            return res.status(400).send({
                status: 'fail',
                message: 'Badge not found',
            });
        }
        badge.imgStorageRef = downloadURL.imgStorageRef;
        await badge.save();
        return res.status(200).send({
            status: 'success',
            message: 'Image uploaded to badge',
            data: {
                imgUrl: downloadURL.imgUrl,
                imgStorageRef: downloadURL.imgStorageRef,
                badgeId,
            },
        });
    } catch (error) {
        console.log('Error uploading image:', error);
        return res.status(400).send({
            status: 'fail',
            message: 'Image not uploaded',
            error: error,
        });
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
    const { eventId, status } = req.body;
    const user = await User.findOne({ accountId: auth.currentUser.uid });
    if(user === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'User not found in database',
        });
    }
    const event = await Event.findOne({ _id: eventId });
    if(event === null) {
        return res.status(400).send({
            status: 'fail',
            message: 'Event not found in database',
        });
    }
    console.log("create-signup", req.body);
    const signup = new Signup({
        accountId: auth.currentUser.uid,
        eventId: event,
        signupDate: new Date(),
        status, // pending, approved, denied
    });

    try {
        await signup.save();
        res.status(201).send({
            status: 'success',
            message: 'Signup created',
            data: {
                accountId: auth.currentUser.uid,
                eventId,
                signupDate: signup.signupDate,
                status: signup.status,
            },
        }
        ); 
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Signup not created',
            error: error,
        });
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
    const { firstName, lastName, email, birthDate, eventId } = req.body;
    const orgId = membership.orgId;
    const volunteer = new VolunteerRequest({
        firstName,
        lastName,
        email,
        birthDate,
        eventId,
        orgId,
        isUser: true,
        status:"pending", // pending, approved, denied
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
                status: volunteer.status,
                isUser: volunteer.isUser,
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
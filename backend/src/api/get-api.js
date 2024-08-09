import express from 'express';
import { getAuth } from 'firebase/auth';
import Badge from '../../models/badge.js';
import Membership from '../../models/membership.js';
import OrgBadge from '../../models/org_badge.js';
import OrgEvent from '../../models/org_event.js';
import Event from '../../models/event.js';
import User from '../../models/user.js';
import Signup from '../../models/signups.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Get API is working');
});

// Get all badges 
router.get('/badges', async (req, res) => {
    const auth = getAuth();
    const storage = getStorage();
    
    if (auth.currentUser === null) {
        return res.status(401).json({ 
            status: 'error',
            message: 'User not logged in',
        });
    }
    
    try {
        const badges = await Badge.find();
        const membership = await Membership.findOne({ accountId: auth.currentUser.uid });

        if (!membership) {
            return res.status(404).json({
                status: 'error',
                message: 'Membership not found',
            });
        }

        const badgePromises = badges.map(async (badge) => {
            const badgeWithLink = badge.toObject();
            if (badge.imgStorageRef) {
                try {
                    const storageRef = ref(storage, badge.imgStorageRef);
                    badgeWithLink.imgUrl = await getDownloadURL(storageRef);
                } catch (error) {
                    console.error('Error fetching download URL for badge', badge._id, error);
                    badgeWithLink.imgUrl = null; // or some default URL
                }
            }
            return badgeWithLink;
        });

        const badgeResults = await Promise.all(badgePromises);

        const orgBadgeIds = await OrgBadge.find({ orgId: membership.orgId });
        const orgBadgeIdSet = new Set(orgBadgeIds.map(orgBadge => orgBadge.badgeId.toString()));

        const filteredBadges = badgeResults.filter(badge => 
            orgBadgeIdSet.has(badge._id.toString())
        );

        return res.json({
            status: 'success',
            data: filteredBadges,
        });

    } catch (error) {
        console.error('Error fetching badges or membership', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

router.get('/events', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        return res.status(401).json({ 
            status: 'error',
            message: 'User not logged in',
        });
    }

    try {
        const membership = await Membership.findOne({ accountId: auth.currentUser.uid });

        if (!membership) {
            return res.status(404).json({
                status: 'error',
                message: 'Membership not found',
            });
        }
        
        const orgEvents = await OrgEvent.find({ orgId: membership.orgId });
        const currentOrgEvents = orgEvents.map((event)=>{return event.eventId;});
        const currentEvents = await Event.find({ _id: { $in: currentOrgEvents } });
        return res.status(200).json({
            status: 'success',
            data: currentEvents,
        });

    } catch (error) {
        console.error('Error fetching membership', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

router.get('/participants', async (req, res) => {
    const auth = getAuth();
    const {eventId} = req.query;
    const incomingEventId = eventId;
    console.log("incoming event id",incomingEventId);
    if (auth.currentUser === null) {
        return res.status(401).json({ 
            status: 'error',
            message: 'User not logged in',
        });
    }

    try {
        const membership = await Membership.findOne({ accountId: auth.currentUser.uid });

        if (!membership) {
            return res.status(404).json({
                status: 'error',
                message: 'Membership not found',
            });
        }

        const orgEvent = await OrgEvent.findOne({ orgId: membership.orgId, eventId: incomingEventId });

        if (!orgEvent) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found',
            });
        }

        const event = await Event.findOne({ _id: incomingEventId });

        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found',
            });
        }

        const signups = await Signup.find({ eventId: incomingEventId });

        if (!signups) {
            return res.status(404).json({
                status: 'error',
                message: 'No signups found',
            });
        }

        const eventParticipants = await Promise.all(signups.map(async (signup) => {
            let eventParticipant = await User.findOne({ accountId: signup.accountId });
            eventParticipant = eventParticipant.toObject();
            eventParticipant.status = signup.status;
            eventParticipant.signupDate = signup.createdAt;
            return eventParticipant;
        }
        ));

        return res.status(200).json({
            status: 'success',
            data: eventParticipants,
        });

    } catch (error) {
        console.error('Error fetching membership', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

export default router;
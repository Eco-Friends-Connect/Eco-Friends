import express from 'express';
import { getAuth } from 'firebase/auth';
import Badge from '../../models/badge.js';
import Membership from '../../models/membership.js';
// import OrgBadge from '../../models/org_badge.js';
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
        // Create an array of promises for fetching the download URLs
        const returnBadges = [];
        const badgePromises = badges.map(async (badge) => {
            const badgeWithLink = badge.toObject();
            if (badge.imgStorageRef) {
                try {
                    const storageRef = ref(storage, badge.imgStorageRef);
                    badge.imgUrl = await getDownloadURL(storageRef);
                    // console.log('Fetched download URL for badge', badge._id);
                    // console.log('Badge image URL:', badge.imgUrl);
                    badgeWithLink.imgUrl = badge.imgUrl;
                    returnBadges.push(badgeWithLink);
                } catch (error) {
                    console.error('Error fetching download URL for badge', badge._id, error);
                    badge.imgUrl = null; // or some default URL
                }
                await badge.save();
            }
        });

        // Wait for all promises to complete
        await Promise.all(badgePromises);

        return res.json({
            status: 'success',
            data: returnBadges,
        });

    } catch (error) {
        console.error('Error fetching badges or membership', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});



export default router;
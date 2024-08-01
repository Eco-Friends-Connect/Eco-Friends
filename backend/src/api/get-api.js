import express from 'express';
import { getAuth } from 'firebase/auth';
import Badge from '../../models/badge.js';
import Membership from '../../models/membership.js';
import OrgBadge from '../../models/org_badge.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Get API is working');
});
/**
 * @swagger
 * /badges:
 *   get:
 *     summary: Returns a list of organization badges
 *     responses:
 *       200:
 *         description: A list of all the badges
 */
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



export default router;
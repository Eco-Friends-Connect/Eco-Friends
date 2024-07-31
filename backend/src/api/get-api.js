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

function getDownloadURLFromFirebase(imgStorageRefFullPath) {
    const storage = getStorage();
    return new Promise((resolve, reject) => {
        const imgRef = ref(storage, imgStorageRefFullPath);
        
        getDownloadURL(imgRef).then((url) => {
            resolve(url);
        }).catch((error) => {
            reject(error);
        });
    });
}
router.get('/badges', async (req, res) => {
    const auth = getAuth();
    if (auth.currentUser === null) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const memberships = await Membership.find({ accountId: auth.currentUser.uid });
        const orgIds = memberships.map(membership => membership.orgId);
        const orgBadges = await OrgBadge.find({ orgId: { $in: orgIds } });
        Badge.find({ _id: { $in: orgBadges.map(orgBadge => orgBadge.badgeId) } }).then((badges) => {
            const badgesWithImgUrl = [];
            badges.forEach(async (badge) => {
                const badgeObj = badge.toObject();
                badgeObj.imgUrl = await getDownloadURLFromFirebase(badge.imgStorageRef);
                badgesWithImgUrl.push(badgeObj);
                if (badgesWithImgUrl.length === badges.length) {
                    res.status(200).json({ 
                        status: 'success',
                        message: 'Badges retrieved successfully',
                        badges: badgesWithImgUrl 
                    });
                }
            });
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
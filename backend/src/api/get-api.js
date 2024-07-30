import express from 'express';
import { getAuth } from 'firebase/auth';
import Badge from '../../models/badge.js';
import Membership from '../../models/membership.js';
import OrgBadge from '../../models/org_badge.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get API is working');
});

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
        const badges = await Badge.find({ _id: { $in: orgBadges.map(orgBadge => orgBadge.badgeId) } });
        res.status(200).json({
            status: 'success',
            message: 'Badges retrieved successfully',
            data: badges
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: error.message,
        });
    }
});

export default router;
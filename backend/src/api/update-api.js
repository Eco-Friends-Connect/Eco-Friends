import express from 'express';
import User from '../../models/user.js';
import Organization from '../../models/organization.js';
import Event from '../../models/event.js';
import Badge from '../../models/badge.js';
import Signup from '../../models/signups.js';
import Membership from '../../models/membership.js';
import OrgEvent from '../../models/org_event.js';
import { getAuth, deleteUser } from "firebase/auth";

const router = express.Router();

// update user
router.put('/update-user/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, update, { runValidators: true });

    
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
  
        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(400).send("Error updating user: " + error.message);
    }
});

// update organization
router.put('/update-organization/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const org = await Organization.findByIdAndUpdate(req.params.id, update);

    
        if (!org) {
            return res.status(404).send({ message: 'Organization not found' });
        }
  
        res.status(200).send('Organization updated successfully');
    } catch (error) {
        res.status(400).send("Error updating organization: " + error.message);
    }
});

// update event
router.put('/update-event/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, update);

    
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
  
        res.status(200).send('Event updated successfully');
    } catch (error) {
        res.status(400).send("Error updating event: " + error.message);
    }
});

// update badge
router.put('/update-badge/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const badge = await Badge.findByIdAndUpdate(req.params.id, update);

    
        if (!badge) {
            return res.status(404).send({ message: 'Badge not found' });
        }
  
        res.status(200).send('Badge updated successfully');
    } catch (error) {
        res.status(400).send("Error updating badge: " + error.message);
    }
});

// update signup
router.put('/update-signup/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const signup = await Signup.findByIdAndUpdate(req.params.id, update);

    
        if (!signup) {
            return res.status(404).send({ message: 'Signup not found' });
        }
  
        res.status(200).send('Signup updated successfully');
    } catch (error) {
        res.status(400).send("Error updating signup: " + error.message);
    }

});
// update organization event
router.put('/update-org-event/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const orgEvent = await OrgEvent.findByIdAndUpdate(req.params.id, update);

    
        if (!orgEvent) {
            return res.status(404).send({ message: 'Organization event not found' });
        }
  
        res.status(200).send('Organization event updated successfully');
    } catch (error) {
        res.status(400).send("Error updating organization event: " + error.message);
    }

});

// update membership
router.put('/update-membership/:id', async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const membership = await Membership.findByIdAndUpdate(req.params.id, update);

    
        if (!membership) {
            return res.status(404).send({ message: 'Membership not found' });
        }
  
        res.status(200).send('Membership updated successfully');
    } catch (error) {
        res.status(400).send("Error updating membership: " + error.message);
    }

});

export default router;
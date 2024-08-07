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

// delete user
router.delete('/delete-user/:id', async(req, res) => {
    

    try {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log("user parsed: " + JSON.stringify(user));
        const result = await User.findByIdAndDelete(req.params.id);
  
    
        deleteUser(user).then(() => {
            console.log("User successfully deleted from firebase");
        }).catch((error) => {
            console.log("Error deleting from firebase: " + error);
        });


        if (!result) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send('Error deleting user: ' + error.message);
        }
});

// delete organization
router.delete('/delete-org/:id', async(req, res) => {
    
    try {
        const auth = getAuth();
        if (auth.currentUser === null) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not logged in',
            });
        }
        const org = await Organization.findByIdAndDelete(req.params.id);

        if (!org) {
            return res.status(404).send('Organization not found');
        }
        res.status(200).send("Organization deleted successfully");        

    } catch (error) {
        res.status(500).send("Error deleting organization: " + error.message);
    }
});

// delete event
router.delete('/delete-event/:id', async(req, res) => {

    try {
        const auth = getAuth();
        if (auth.currentUser === null) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not logged in',
            });
        }
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.status(200).send('Event deleted successfully');
    } catch (error) {
        res.status(500).send("Error deleting event: " + error.message);
    }
});

// delete badge
router.delete('/delete-badge/:id', async(req, res) => {
    
    try {
        const auth = getAuth();
        if (auth.currentUser === null) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not logged in',
            });
        }
        const event = await Badge.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).send('Badge not found');
        }
        res.status(200).send('Badge deleted successfully');
    } catch (error) {
        res.status(500).send("Error deleting badge: " + error.message);
    }
});

// delete signup
router.delete('/delete-signup/:id', async(req, res) => {
    
    try {
        const auth = getAuth();
        if (auth.currentUser === null) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not logged in',
            });
        }
        const event = await Signup.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).send('Signup not found');
        }
        res.status(200).send('Signup deleted successfully');
    } catch (error) {
        res.status(500).send("Error deleting signup: " + error.message);
    }
});

// delete organization event
router.delete('/delete-org-event/:id', async(req, res) => {

    
    try {
        const auth = getAuth();
        if (auth.currentUser === null) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not logged in',
            });
        }
        const event = await OrgEvent.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).send('Organization event not found');
        }
        res.status(200).send('Organization event deleted successfully');
    } catch (error) {
        res.status(500).send("Error deleting organization event: " + error.message);
    }
});

// delete membership
router.delete('/delete-membership/:id', async(req, res) => {
    
    try {
        const auth = getAuth();
        if (auth.currentUser === null) {
            return res.status(400).send({
                status: 'fail',
                message: 'User not logged in',
            });
        }
        const event = await Membership.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).send('Membership not found');
        }
        res.status(200).send('Membership deleted successfully');
    } catch (error) {
        res.status(500).send("Error deleting membership: " + error.message);
    }
});


export default router;
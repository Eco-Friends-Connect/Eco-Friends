import express from 'express';
import User from '../../models/user.js';
import { getAuth, deleteUser } from "firebase/auth";


const router = express.Router();

router.delete('/users/:id', async(req, res) => {
    

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



export default router;
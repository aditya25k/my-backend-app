import User from '../models/user.js';

// Controller function to search users based on query parameter 'q'
export const searchUsers = async (req, res) => {
    const query = req.query.q;
    try {
        // Search users by name or email matching the query (case-insensitive)
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Controller function to create a new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'user already exists'});
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        // Added response here to send back the created user
        // Without this, the client request would hang indefinitely
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




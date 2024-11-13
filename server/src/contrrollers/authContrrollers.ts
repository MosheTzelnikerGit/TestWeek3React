import e, { Request, Response } from 'express';
import  User  from "../models/User"
import jwt from 'jsonwebtoken';

export const register =async (req: Request, res: Response): Promise<void> => {
    try {
        const userRegistered = new User(req.body);
        const user = await User.findOne({ username: userRegistered.username });
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const savedUser = await userRegistered.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};
 
export const login =async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, organization: user.organization, region: user.region },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
          );

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {    
        res.status(500).json({ message: 'Error logging in' }); 
    }
};     
 
import  { Request, Response } from 'express';
import  User  from "../models/User"
import jwt from 'jsonwebtoken';
import Organization from "../models/Organization"

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, organization, region } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }
      const userOrganization = await Organization.findOne({ name: `${organization} - ${region}` || organization });
      if (!userOrganization) {
        res.status(400).json({ message: 'Organization not found' });
        return;
      }
      const newUser = new User({
        username,
        password,
        organization,
        region,
        missiles:userOrganization? userOrganization.resources:[],
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  };
  

 
export const login =async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
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
 
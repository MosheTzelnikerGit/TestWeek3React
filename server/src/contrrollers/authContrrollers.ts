import  { Request, Response } from 'express';
import  User  from "../models/User"
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import Organization from "../models/Organization"

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, organization, region } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    if (organization === "IDF" && !region) {
      res.status(400).json({ message: 'Region is required for IDF' });
      return;
    }
    const userOrganization = region 
      ? await Organization.findOne({ name: `${organization} - ${region}` })
      : await Organization.findOne({ name: organization });

    if (!userOrganization) {
      res.status(400).json({ message: 'Organization not found' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      organization,
      resources: userOrganization.resources,
      region,
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

        const decipheredPassword = await bcrypt.compare(password, user.password);
        if (!decipheredPassword) {
            res.status(400).json({ message: 'Invalid credentials',success: false });
            return;
        }

        const token = jwt.sign(
            { id: user._id,  organization: user.organization, region: user.region, resources: user.resources },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
          );

        res.status(200).json({ message: 'Login successful', token, user,success: true });
    } catch (error) {    
        res.status(500).json({ message: 'Error logging in' }); 
    }
};     
 
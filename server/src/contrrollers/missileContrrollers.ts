import  { Request, Response } from 'express';
import User from "../models/User"

export const getMissiles =async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch missiles', error });
      }
}


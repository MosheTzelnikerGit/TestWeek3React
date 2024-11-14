import { Request, Response } from "express";
import Organizations from "../models/Organization";
import Missiles from "../models/Missile";

export const getResources = async (req: Request, res: Response): Promise<void> => {
  const { organization, region } = req.body;

  try {
    let existOrganization;

    if (region) {
      existOrganization = await Organizations.findOne({ name: `${organization} - ${region}` });
    }

    if (!existOrganization) {
      existOrganization = await Organizations.findOne({ name: organization });
    }

    if (!existOrganization) {
      res.status(400).json({ message: "Organization not found", success: false });
      return;
    }

    const resources = existOrganization.resources.map((r) => r.name);

    res.status(200).json({ data: existOrganization.resources, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve defense tools." });
  }
};

export const getDetailsOfAmmo = async (req: Request, res: Response): Promise<void> => {
  const ammo = req.params.name;

  try {
    const details = await Missiles.findOne({ name: ammo });

    res.status(200).json({ data: details, success: true });
  } catch (error) {
    res.status(400).json({ message: "error", success: false });
  }
};

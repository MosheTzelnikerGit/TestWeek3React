import express from 'express';

import { getMissiles } from "../contrrollers/missileContrrollers"



const router = express.Router();

router.route('/:id').get(getMissiles);




export default router;
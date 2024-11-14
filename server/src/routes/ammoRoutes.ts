// import express from 'express';

// import {  } from "../contrrollers/missileContrrollers"



// const router = express.Router();

// router.route('/:id').get(getMissiles);





import express from 'express';
import { getResources, getDetailsOfAmmo } from "../contrrollers/missileContrrollers"


const router = express.Router();

router.route("/ammo").post(getResources);
router.route("/ammo/:name").get(getDetailsOfAmmo);



export default router;
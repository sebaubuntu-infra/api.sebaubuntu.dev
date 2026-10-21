//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import { Router } from 'express';
import { defaultResponse } from '../../utils.js';

import { batteries } from './batteries.js';
import { cpu } from './cpu.js';
import { disks } from './disks.js';
import { gpus } from './gpus.js';
import { memory } from './memory.js';
import { os } from './os.js';
import { system } from './system.js';

const router = Router();

router.get("/", defaultResponse);

router.get("/batteries", batteries);
router.get("/cpu", cpu);
router.get("/disks", disks);
router.get("/gpus", gpus);
router.get("/memory", memory);
router.get("/os", os);
router.get("/system", system);

export default router;

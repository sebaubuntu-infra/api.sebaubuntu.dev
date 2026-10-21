//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import { Router } from 'express';
import { defaultResponse } from '../utils.js';

import v1Router from './v1/main.js';

const router = Router();

router.get("/", defaultResponse);

router.use("/v1", v1Router);

export default router;

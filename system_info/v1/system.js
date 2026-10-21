//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { baseboard, bios, chassis, system as getSystem } from 'systeminformation';

/**
 * Get information about the system.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function system(req, res) {
    const systemInfo = await getSystem();
    const biosInfo = await bios();
    const baseboardInfo = await baseboard();
    const chassisInfo = await chassis();

    const result = {
        "system": {
            "manufacturer": systemInfo.manufacturer,
            "model": systemInfo.model,
            "version": systemInfo.version,
            "sku": systemInfo.sku,
            "virtual": systemInfo.virtual,
            "virtualHost": systemInfo.virtualHost ? systemInfo.virtualHost : "",
        },
        "bios": {
            "vendor": biosInfo.vendor,
            "version": biosInfo.version,
            "releaseDate": biosInfo.releaseDate,
            "revision": biosInfo.revision,
            "language": biosInfo.language ? biosInfo.language : "en",
            "features": biosInfo.features ? biosInfo.features : [],
        },
        "baseboard": {
            "manufacturer": baseboardInfo.manufacturer,
            "model": baseboardInfo.model,
            "version": baseboardInfo.version,
            "memMax": baseboardInfo.memMax ? baseboardInfo.memMax : 0,
            "memSlots": baseboardInfo.memSlots ? baseboardInfo.memSlots : 0,
        },
        "chassis": {
            "manufacturer": chassisInfo.manufacturer,
            "model": chassisInfo.model,
            "type": chassisInfo.type,
            "version": chassisInfo.version,
            "sku": chassisInfo.sku,
        },
    };

    return res.status(200).json(result);
}

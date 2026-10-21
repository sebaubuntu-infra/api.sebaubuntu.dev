//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { graphics } from 'systeminformation';

/**
 * Get information about the GPUs.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function gpus(req, res) {
    const graphicsInfo = await graphics();

    const result = graphicsInfo.controllers.map((controller) => {
        return {
            "vendor": controller.vendor,
            "model": controller.model,
            "bus": controller.bus,
            "busAddress": controller.busAddress,
            "vram": controller.vram,
            "vramDynamic": controller.vramDynamic,
            "pciID": controller.pciID,
            "driverVersion": controller.driverVersion,
            "subDeviceId": controller.subDeviceId,
            "name": controller.name,
            "pciBus": controller.pciBus,
            "fanSpeed": controller.fanSpeed,
            "memoryTotal": controller.memoryTotal,
            "memoryUsed": controller.memoryUsed,
            "memoryFree": controller.memoryFree,
            "utilizationGpu": controller.utilizationGpu,
            "utilizationMemory": controller.utilizationMemory,
            "temperatureGpu": controller.temperatureGpu,
            "powerDraw": controller.powerDraw,
            "powerLimit": controller.powerLimit,
            "clockCore": controller.clockCore,
            "clockMemory": controller.clockMemory,
        }
    });

    return res.status(200).json(result);
}

//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { cpu as getCpu, cpuCurrentSpeed, cpuTemperature } from 'systeminformation';

/**
 * Get information about the CPU.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function cpu(req, res) {
    const cpuInfo = await getCpu();
    const cpuCurrentSpeedInfo = await cpuCurrentSpeed();
    const cpuTemperatureInfo = await cpuTemperature();

    const result = {
        "manufacturer": cpuInfo.manufacturer,
        "brand": cpuInfo.brand,
        "vendor": cpuInfo.vendor,
        "family": cpuInfo.family,
        "model": cpuInfo.model,
        "stepping": cpuInfo.stepping,
        "revision": cpuInfo.revision,
        "voltage": cpuInfo.voltage,
        "speed": cpuInfo.speed,
        "speedMin": cpuInfo.speedMin,
        "speedMax": cpuInfo.speedMax,
        "governor": cpuInfo.governor,
        "cores": cpuInfo.cores,
        "physicalCores": cpuInfo.physicalCores,
        "performanceCores": cpuInfo.performanceCores ? cpuInfo.performanceCores : 0,
        "efficiencyCores": cpuInfo.efficiencyCores ? cpuInfo.efficiencyCores : 0,
        "processors": cpuInfo.processors,
        "socket": cpuInfo.socket,
        "flags": cpuInfo.flags.split(" "),
        "virtualization": cpuInfo.virtualization,
        "cache": {
            "l1d": cpuInfo.cache.l1d,
            "l1i": cpuInfo.cache.l1i,
            "l2": cpuInfo.cache.l2,
            "l3": cpuInfo.cache.l3,
        },
        "currentSpeed": {
            "min": cpuCurrentSpeedInfo.min,
            "max": cpuCurrentSpeedInfo.max,
            "avg": cpuCurrentSpeedInfo.avg,
            "cores": cpuCurrentSpeedInfo.cores,
        },
        "temperature": {
            "main": cpuTemperatureInfo.main,
            "cores": cpuTemperatureInfo.cores,
            "max": cpuTemperatureInfo.max,
            "socket": cpuTemperatureInfo.socket ? cpuTemperatureInfo.socket : [],
            "chipset": cpuTemperatureInfo.chipset ? cpuTemperatureInfo.chipset : 0,
        },
    };

    return res.status(200).json(result);
}

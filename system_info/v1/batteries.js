//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { battery } from 'systeminformation';

/**
 * Get information about the batteries.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function batteries(req, res) {
    const batteryInfo = await battery();

    const batteries = [];

    if (batteryInfo.hasBattery) {
        batteries.push({
            "cycleCount": batteryInfo.cycleCount,
            "isCharging": batteryInfo.isCharging,
            "designedCapacity": batteryInfo.designedCapacity,
            "maxCapacity": batteryInfo.maxCapacity,
            "currentCapacity": batteryInfo.currentCapacity,
            "capacityUnit": batteryInfo.capacityUnit,
            "voltage": batteryInfo.voltage,
            "percent": batteryInfo.percent,
            "timeRemaining": batteryInfo.timeRemaining,
            "acConnected": batteryInfo.acConnected,
            "type": batteryInfo.type,
            "model": batteryInfo.model,
            "manufacturer": batteryInfo.manufacturer,
        });
    }

    batteryInfo.additionalBatteries?.forEach(battery => {
        batteries.push({
            "cycleCount": battery.cycleCount,
            "isCharging": battery.isCharging,
            "designedCapacity": battery.designedCapacity,
            "maxCapacity": battery.maxCapacity,
            "currentCapacity": battery.currentCapacity,
            "capacityUnit": battery.capacityUnit,
            "voltage": battery.voltage,
            "percent": battery.percent,
            "timeRemaining": battery.timeRemaining,
            "acConnected": battery.acConnected,
            "type": battery.type,
            "model": battery.model,
            "manufacturer": battery.manufacturer,
        });
    });

    const result = {
        "acConnected": batteryInfo.acConnected,
        "batteries": batteries,
    };

    return res.status(200).json(result);
}

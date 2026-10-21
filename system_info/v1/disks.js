//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { blockDevices, diskLayout, fsSize } from 'systeminformation';

/**
 * Get information about the disks.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function disks(req, res) {
    const diskLayoutInfo = await diskLayout();
    const blockDevicesInfo = await blockDevices();
    const fsSizeInfo = await fsSize();

    const result = {
        "diskLayout": diskLayoutInfo.map((disk) => {
            return {
                "device": disk.device,
                "type": disk.type,
                "name": disk.name,
                "vendor": disk.vendor,
                "size": disk.size,
                "totalCylinders": disk.totalCylinders,
                "totalHeads": disk.totalHeads,
                "totalTracks": disk.totalTracks,
                "totalSectors": disk.totalSectors,
                "tracksPerCylinder": disk.tracksPerCylinder,
                "sectorsPerTrack": disk.sectorsPerTrack,
                "bytesPerSector": disk.bytesPerSector,
                "firmwareRevision": disk.firmwareRevision,
                "interfaceType": disk.interfaceType,
                "smartStatus": disk.smartStatus,
                "temperature": disk.temperature,
            }
        }),
        "blockDevices": blockDevicesInfo.map((blockDevice) => {
            return {
                "name": blockDevice.name,
                "type": blockDevice.type,
                "fsType": blockDevice.fsType,
                "mount": blockDevice.mount,
                "size": blockDevice.size,
                "physical": blockDevice.physical,
                "uuid": blockDevice.uuid,
                "label": blockDevice.label,
                "model": blockDevice.model,
                "removable": blockDevice.removable,
                "protocol": blockDevice.protocol,
                "group": blockDevice.group,
                "device": blockDevice.device,
            }
        }),
        "fsSize": fsSizeInfo.map((fs) => {
            return {
                "fs": fs.fs,
                "type": fs.type,
                "size": fs.size,
                "used": fs.used,
                "available": fs.available,
                "use": fs.use,
                "mount": fs.mount,
                "rw": fs.rw,
            }
        }),
    };

    return res.status(200).json(result);
}

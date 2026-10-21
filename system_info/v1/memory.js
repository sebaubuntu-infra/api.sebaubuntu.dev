//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { mem, memLayout } from 'systeminformation';

/**
 * Get information about the memory.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function memory(req, res) {
    let memInfo = await mem();
    let memLayoutInfo = await memLayout();

    const result = {
        "total": memInfo.total,
        "free": memInfo.free,
        "used": memInfo.used,
        "active": memInfo.active,
        "buffcache": memInfo.buffcache,
        "buffers": memInfo.buffers,
        "cached": memInfo.cached,
        "slab": memInfo.slab,
        "available": memInfo.available,
        "swaptotal": memInfo.swaptotal,
        "swapused": memInfo.swapused,
        "swapfree": memInfo.swapfree,
        "memLayout": memLayoutInfo.map((mem) => {
            return {
                "size": mem.size,
                "bank": mem.bank,
                "type": mem.type,
                "ecc": mem.ecc,
                "clockSpeed": mem.clockSpeed,
                "formFactor": mem.formFactor,
                "manufacturer": mem.manufacturer,
                "partNum": mem.partNum,
                "voltageConfigured": mem.voltageConfigured,
                "voltageMin": mem.voltageMin,
                "voltageMax": mem.voltageMax,
            };
        }),
    };

    return res.status(200).json(result);
}

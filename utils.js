//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;

/**
 * Default positive response.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function defaultResponse(req, res) {
    res.json(
        {
            "result": "God's In His Heaven, All's Right With The World"
        }
    );
}

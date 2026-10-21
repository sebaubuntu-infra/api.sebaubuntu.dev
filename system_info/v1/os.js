//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import express from 'express';
const { Request, Response } = express;
import { osInfo, shell, versions } from 'systeminformation';

/**
 * Get information about the OS.
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function os(req, res) {
    const osInfoInfo = await osInfo();
    const shellInfo = await shell();
    const versionsInfo = await versions();

    const result = {
        "os": {
            "platform": osInfoInfo.platform,
            "distro": osInfoInfo.distro,
            "release": osInfoInfo.release,
            "codename": osInfoInfo.codename,
            "kernel": osInfoInfo.kernel,
            "arch": osInfoInfo.arch,
            "hostname": osInfoInfo.hostname,
            "fqdn": osInfoInfo.fqdn,
            "codepage": osInfoInfo.codepage,
            "logofile": osInfoInfo.logofile,
            "build": osInfoInfo.build,
            "servicepack": osInfoInfo.servicepack,
            "uefi": osInfoInfo.uefi ? true : false,
            "hypervizor": osInfoInfo.hypervizor ? true : false,
            "remoteSession": osInfoInfo.remoteSession ? true : false,
        },
        "shell": shellInfo,
        "versions": {
            "kernel": versionsInfo.kernel ? versionsInfo.kernel : "N/A",
            "openssl": versionsInfo.openssl ? versionsInfo.openssl : "N/A",
            "systemOpenssl": versionsInfo.systemOpenssl ? versionsInfo.systemOpenssl : "N/A",
            "systemOpensslLib": versionsInfo.systemOpensslLib ? versionsInfo.systemOpensslLib : "N/A",
            "node": versionsInfo.node ? versionsInfo.node : "N/A",
            "v8": versionsInfo.v8 ? versionsInfo.v8 : "N/A",
            "npm": versionsInfo.npm ? versionsInfo.npm : "N/A",
            "yarn": versionsInfo.yarn ? versionsInfo.yarn : "N/A",
            "pm2": versionsInfo.pm2 ? versionsInfo.pm2 : "N/A",
            "gulp": versionsInfo.gulp ? versionsInfo.gulp : "N/A",
            "grunt": versionsInfo.grunt ? versionsInfo.grunt : "N/A",
            "git": versionsInfo.git ? versionsInfo.git : "N/A",
            "tsc": versionsInfo.tsc ? versionsInfo.tsc : "N/A",
            "mysql": versionsInfo.mysql ? versionsInfo.mysql : "N/A",
            "redis": versionsInfo.redis ? versionsInfo.redis : "N/A",
            "mongodb": versionsInfo.mongodb ? versionsInfo.mongodb : "N/A",
            "apache": versionsInfo.apache ? versionsInfo.apache : "N/A",
            "nginx": versionsInfo.nginx ? versionsInfo.nginx : "N/A",
            "php": versionsInfo.php ? versionsInfo.php : "N/A",
            "docker": versionsInfo.docker ? versionsInfo.docker : "N/A",
            "postfix": versionsInfo.postfix ? versionsInfo.postfix : "N/A",
            "postgresql": versionsInfo.postgresql ? versionsInfo.postgresql : "N/A",
            "perl": versionsInfo.perl ? versionsInfo.perl : "N/A",
            "python": versionsInfo.python ? versionsInfo.python : "N/A",
            "python3": versionsInfo.python3 ? versionsInfo.python3 : "N/A",
            "java": versionsInfo.java ? versionsInfo.java : "N/A",
            "gcc": versionsInfo.gcc ? versionsInfo.gcc : "N/A",
            "virtualbox": versionsInfo.virtualbox ? versionsInfo.virtualbox : "N/A",
            "bash": versionsInfo.bash ? versionsInfo.bash : "N/A",
            "zsh": versionsInfo.zsh ? versionsInfo.zsh : "N/A",
            "fish": versionsInfo.fish ? versionsInfo.fish : "N/A",
            "powershell": versionsInfo.powershell ? versionsInfo.powershell : "N/A",
            "dotnet": versionsInfo.dotnet ? versionsInfo.dotnet : "N/A",
        },
    };

    return res.status(200).json(result);
}

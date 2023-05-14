//
// Copyright (C) 2023 Sebastiano Barezzi <seba@sebaubuntu.dev>
//
// SPDX-License-Identifier: MIT
//

const systeminformation = require('systeminformation');

const API_ROOT = "system_info";

async function getSystemInfo(apiVersion) {
	let system = await systeminformation.system();
	let bios = await systeminformation.bios();
	let baseboard = await systeminformation.baseboard();
	let chassis = await systeminformation.chassis();

	return {
		"system": {
			"manufacturer": system.manufacturer,
			"model": system.model,
			"version": system.version,
			"sku": system.sku,
			"virtual": system.virtual,
			"virtualHost": system.virtualHost ? system.virtualHost : "",
		},
		"bios": {
			"vendor": bios.vendor,
			"version": bios.version,
			"releaseDate": bios.releaseDate,
			"revision": bios.revision,
			"language": bios.language ? bios.language : "en",
			"features": bios.features ? bios.features : [],
		},
		"baseboard": {
			"manufacturer": baseboard.manufacturer,
			"model": baseboard.model,
			"version": baseboard.version,
			"memMax": baseboard.memMax ? baseboard.memMax : 0,
			"memSlots": baseboard.memSlots ? baseboard.memSlots : 0,
		},
		"chassis": {
			"manufacturer": chassis.manufacturer,
			"model": chassis.model,
			"type": chassis.type,
			"version": chassis.version,
			"sku": chassis.sku,
		},
	};
}

async function getCpuInfo(apiVersion) {
	let cpu = await systeminformation.cpu();
	let cpuCurrentSpeed = await systeminformation.cpuCurrentSpeed();
	let cpuTemperature = await systeminformation.cpuTemperature();

	return {
		"manufacturer": cpu.manufacturer,
		"brand": cpu.brand,
		"vendor": cpu.vendor,
		"family": cpu.family,
		"model": cpu.model,
		"stepping": cpu.stepping,
		"revision": cpu.revision,
		"voltage": cpu.voltage,
		"speed": cpu.speed,
		"speedMin": cpu.speedMin,
		"speedMax": cpu.speedMax,
		"governor": cpu.governor,
		"cores": cpu.cores,
		"physicalCores": cpu.physicalCores,
		"performanceCores": cpu.performanceCores ? cpu.performanceCores : 0,
		"efficiencyCores": cpu.efficiencyCores ? cpu.efficiencyCores : 0,
		"processors": cpu.processors,
		"socket": cpu.socket,
		"flags": cpu.flags,
		"virtualization": cpu.virtualization,
		"cache": {
			"l1d": cpu.cache.l1d,
			"l1i": cpu.cache.l1i,
			"l2": cpu.cache.l2,
			"l3": cpu.cache.l3,
		},
		"currentSpeed": {
			"min": cpuCurrentSpeed.min,
			"max": cpuCurrentSpeed.max,
			"avg": cpuCurrentSpeed.avg,
			"cores": cpuCurrentSpeed.cores,
		},
		"temperature": {
			"main": cpuTemperature.main,
			"cores": cpuTemperature.cores,
			"max": cpuTemperature.max,
			"socket": cpuTemperature.socket ? cpuTemperature.socket : [],
			"chipset": cpuTemperature.chipset ? cpuTemperature.chipset : 0,
		},
	};
}

async function getMemoryInfo(apiVersion) {
	let mem = await systeminformation.mem();
	let memLayout = await systeminformation.memLayout();

	return {
		"total": mem.total,
		"free": mem.free,
		"used": mem.used,
		"active": mem.active,
		"buffcache": mem.buffcache,
		"buffers": mem.buffers,
		"cached": mem.cached,
		"slab": mem.slab,
		"available": mem.available,
		"swaptotal": mem.swaptotal,
		"swapused": mem.swapused,
		"swapfree": mem.swapfree,
		"memLayout": memLayout.map((mem) => {
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
}

async function getBatteriesInfo(apiVersion) {
	let batteryInfo = await systeminformation.battery();

	let batteries = [];

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

	return {
		"acConnected": batteryInfo.acConnected,
		"batteries": batteries,
	};
}

async function getGpusInfo(apiVersion) {
	let controllers = (await systeminformation.graphics()).controllers;

	return controllers.map((controller) => {
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
}

async function getOsInfo(apiVersion) {
	let osInfo = await systeminformation.osInfo();
	let shell = await systeminformation.shell();
	let versions = await systeminformation.versions();

	return {
		"os": {
			"platform": osInfo.platform,
			"distro": osInfo.distro,
			"release": osInfo.release,
			"codename": osInfo.codename,
			"kernel": osInfo.kernel,
			"arch": osInfo.arch,
			"hostname": osInfo.hostname,
			"fqdn": osInfo.fqdn,
			"codepage": osInfo.codepage,
			"logofile": osInfo.logofile,
			"build": osInfo.build,
			"servicepack": osInfo.servicepack,
			"uefi": osInfo.uefi ? true : false,
			"hypervizor": osInfo.hypervizor ? true : false,
			"remoteSession": osInfo.remoteSession ? true : false,
		},
		"shell": shell,
		"versions": {
			"kernel": versions.kernel ? versions.kernel : "N/A",
			"openssl": versions.openssl ? versions.openssl : "N/A",
			"systemOpenssl": versions.systemOpenssl ? versions.systemOpenssl : "N/A",
			"systemOpensslLib": versions.systemOpensslLib ? versions.systemOpensslLib : "N/A",
			"node": versions.node ? versions.node : "N/A",
			"v8": versions.v8 ? versions.v8 : "N/A",
			"npm": versions.npm ? versions.npm : "N/A",
			"yarn": versions.yarn ? versions.yarn : "N/A",
			"pm2": versions.pm2 ? versions.pm2 : "N/A",
			"gulp": versions.gulp ? versions.gulp : "N/A",
			"grunt": versions.grunt ? versions.grunt : "N/A",
			"git": versions.git ? versions.git : "N/A",
			"tsc": versions.tsc ? versions.tsc : "N/A",
			"mysql": versions.mysql ? versions.mysql : "N/A",
			"redis": versions.redis ? versions.redis : "N/A",
			"mongodb": versions.mongodb ? versions.mongodb : "N/A",
			"apache": versions.apache ? versions.apache : "N/A",
			"nginx": versions.nginx ? versions.nginx : "N/A",
			"php": versions.php ? versions.php : "N/A",
			"docker": versions.docker ? versions.docker : "N/A",
			"postfix": versions.postfix ? versions.postfix : "N/A",
			"postgresql": versions.postgresql ? versions.postgresql : "N/A",
			"perl": versions.perl ? versions.perl : "N/A",
			"python": versions.python ? versions.python : "N/A",
			"python3": versions.python3 ? versions.python3 : "N/A",
			"java": versions.java ? versions.java : "N/A",
			"gcc": versions.gcc ? versions.gcc : "N/A",
			"virtualbox": versions.virtualbox ? versions.virtualbox : "N/A",
			"bash": versions.bash ? versions.bash : "N/A",
			"zsh": versions.zsh ? versions.zsh : "N/A",
			"fish": versions.fish ? versions.fish : "N/A",
			"powershell": versions.powershell ? versions.powershell : "N/A",
			"dotnet": versions.dotnet ? versions.dotnet : "N/A",
		},
	};
}

async function getDisksInfo(apiVersion) {
	let diskLayout = await systeminformation.diskLayout();
	let blockDevices = await systeminformation.blockDevices();
	let fsSize = await systeminformation.fsSize();

	return {
		"diskLayout": diskLayout.map((disk) => {
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
		"blockDevices": blockDevices.map((blockDevice) => {
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
		"fsSize": fsSize.map((fs) => {
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
}

function addRoutes(app) {
	app.get(`/${API_ROOT}`, async function(req, res) {
		res.json(
			{
				"result": "God's In His Heaven, All's Right With The World",
			}
		);
	});

	// v1
	app.get(`/${API_ROOT}/v1`, async function(req, res) {
		res.json(
			{
				"result": "God's In His Heaven, All's Right With The World",
			}
		);
	});
	app.get(`/${API_ROOT}/v1/system`, async function(req, res) {
		let systemInfo = await getSystemInfo("v1");
		res.json(systemInfo);
	});
	app.get(`/${API_ROOT}/v1/cpu`, async function(req, res) {
		let cpuInfo = await getCpuInfo("v1");
		res.json(cpuInfo);
	});
	app.get(`/${API_ROOT}/v1/memory`, async function(req, res) {
		let memoryInfo = await getMemoryInfo("v1");
		res.json(memoryInfo);
	});
	app.get(`/${API_ROOT}/v1/batteries`, async function(req, res) {
		let batteriesInfo = await getBatteriesInfo("v1");
		res.json(batteriesInfo);
	});
	app.get(`/${API_ROOT}/v1/gpus`, async function(req, res) {
		let gpusInfo = await getGpusInfo("v1");
		res.json(gpusInfo);
	});
	app.get(`/${API_ROOT}/v1/os`, async function(req, res) {
		let osInfo = await getOsInfo("v1");
		res.json(osInfo);
	});
	app.get(`/${API_ROOT}/v1/disks`, async function(req, res) {
		let disksInfo = await getDisksInfo("v1");
		res.json(disksInfo);
	});
}

module.exports = {
	addRoutes: addRoutes
};

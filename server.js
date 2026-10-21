//
// SPDX-FileCopyrightText: Sebastiano Barezzi <seba@sebaubuntu.dev>
// SPDX-License-Identifier: MIT
//

import cors from "cors";
import express from "express";

import { defaultResponse } from "./utils.js";

import systemInfoRouter from './system_info/main.js';

const DEBUG = true;
const PORT = process.env.PORT || 3000;

// Create Express app
let app = express();

// Enable CORS
app.use(cors({
	origin: '*'
}));

app.get("/", defaultResponse);

app.use("/system_info", systemInfoRouter);

// Start the server
app.listen(PORT, function () {
	console.log("http://localhost:" + PORT + "/");
});

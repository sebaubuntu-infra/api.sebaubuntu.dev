//
// Copyright (C) 2023 Sebastiano Barezzi <seba@sebaubuntu.dev>
//
// SPDX-License-Identifier: MIT
//

const cors = require("cors");
const express = require("express");

const systemInfo = require('./modules/system_info');

const DEBUG = true;
const PORT = process.env.PORT || 3000;

// Create Express app
let app = express();

// Enable CORS
app.use(cors({
	origin: '*'
}));

app.get("/", function(req, res) {
	res.json(
		{
			"result": "God's In His Heaven, All's Right With The World"
		}
	);
});

systemInfo.addRoutes(app);

// Start the server
app.listen(PORT, function () {
	console.log("http://localhost:" + PORT + "/");
});

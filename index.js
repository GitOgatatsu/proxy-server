const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const rateLimit = require("express-rate-limit");
require("dotenv").config();
//const url = require("url");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000
});

app.get("/", (req, res) => {
//	const params = url.parse(req.url).query;
//	console.log(params);
	res.send("This is my proxy server");
});

//app.use(limiter);

app.use("/corona-tracker-world-data", limiter, (req, res, next) => {
	createProxyMiddleware({
//		target: "https://monotein-books.vercel.app/api/corona-tracker/summary",
		target: process.env.BASE_API_URL_CORONA_WORLD,
		changeOrigin: true,
		pathRewrite: {
			[`^/corona-tracker-world-data`]: "",
		}
	})(req, res, next);
});

app.listen(5000, () => {
	console.log("Litening on localhost port 5000");
});

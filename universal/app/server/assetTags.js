import fs from "fs";
import path from "path";
import renderToString from "preact-render-to-string";
import indexHtml from "../index.html";

const pathToStatsJson = path.resolve(__dirname, "..", "public", "stats.json");

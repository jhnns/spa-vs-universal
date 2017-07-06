import path from "path";

const pathToConfig = path.resolve(process.cwd(), "config", "server");
const config = require(pathToConfig);

export default config;

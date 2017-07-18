import path from "path";

const pathToConfig = path.resolve(process.cwd(), "config", "server");
const config = require(pathToConfig);

config.hostname = config.hostname || "localhost";
config.port = config.port || process.env.PORT;

export default config;

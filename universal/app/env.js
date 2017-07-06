const env = process.env.NODE_ENV || "development";

export const isProd = env === "production";
export const isDev = isProd === false;

export default env;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const config_1 = require("./config");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./server/models/*",
    out: "./server/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: `postgres://${config_1.ServerConfig.POSTGRES_USER}:${config_1.ServerConfig.POSTGRES_PASSWORD}@localhost:5433/${config_1.ServerConfig.POSTGRES_DB}`,
    },
});

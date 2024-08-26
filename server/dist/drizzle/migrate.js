"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const postgres_1 = __importDefault(require("postgres"));
const migrationClient = (0, postgres_1.default)(`postgres://${config_1.ServerConfig.POSTGRES_USER}:${config_1.ServerConfig.POSTGRES_PASSWORD}@localhost:5433/${config_1.ServerConfig.POSTGRES_DB}`, { max: 1 });
async function main() {
    await (0, migrator_1.migrate)((0, postgres_js_1.drizzle)(migrationClient), {
        migrationsFolder: "./server/drizzle",
    });
    await migrationClient.end();
}
main();

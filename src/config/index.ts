import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

const parsedPort = Number(process.env.PORT);

const config = {
    port: Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 8000,
    connection_string: process.env.DATABASE_CONNECTION,
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
    jwt_refreshToken: process.env.JWT_REFRESH_TOKEN
};

export default config;

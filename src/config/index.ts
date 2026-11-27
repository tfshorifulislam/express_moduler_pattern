import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

const config = {
    port: process.env.PORT,
    connection_string: process.env.DATABASE_CONNECTION,
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
}

export default config;
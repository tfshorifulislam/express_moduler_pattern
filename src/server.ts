import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

const main = async (): Promise<void> => {
    await initDB();
    app.listen(config.port, () => {
        console.log(`app listening on port ${config.port}`);
    });
};

void main();

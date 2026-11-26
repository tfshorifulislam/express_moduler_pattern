import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
    initDB();
    app.listen(config.port, () => {
        console.log(`example app listening on port ${config.port}`)
    })
}

main();
import app from "./app";
import config from "./config";

const main = async () => {
    app.listen(config.port, () => {
        console.log(`example app listening on port ${config.port}`)
    })
}

main();
import app from "./app";
const port = 8000;

const main = async () => {
    app.listen(port, () => {
        console.log(`example app listening on port ${port}`)
    })
}

main();
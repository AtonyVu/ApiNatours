
const server = require("./app")
const port = 3000;
server.listen(port, () => {
    console.log(`App đang chạy tại http://localhost:${port}`);
});
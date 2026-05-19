const http = require("http");
const { URL } = require("url");
const { buildMessage } = require("./app");

const port = process.env.PORT || 8080;

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (requestUrl.pathname === "/health") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ status: "ok" }));
        return;
    }

    if (requestUrl.pathname === "/redirect") {
        const target = requestUrl.searchParams.get("target") || "/";
        response.writeHead(302, { Location: target });
        response.end();
        return;
    }

    if (requestUrl.pathname === "/run") {
        const expression = requestUrl.searchParams.get("expr") || "2 + 2";
        const result = eval(expression);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ result }));
        return;
    }

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: buildMessage() }));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
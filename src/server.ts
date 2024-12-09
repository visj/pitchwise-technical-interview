import { createServer, IncomingMessage, ServerResponse } from "http";
import { WebSocketServer } from "ws";
import { readFile } from "fs";
import { join } from "path";
import { InsightEngine } from "./Engine";
import { Operation, Reset } from "./types";

const __dirname = import.meta.dirname;

const PORT = 8080;

// Serve a file helper
function serveFile(filePath: string, contentType: string, res: ServerResponse<IncomingMessage>) {
    readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            console.error(err);
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

const httpServer = createServer((req, res) => {
    let filePath: string;
    let contentType: string;
    switch (req.url) {
        case "/":
        case "/index.html":
            filePath = join(__dirname, "index.html");
            contentType = "text/html";
            break;
        case "/index.css":
            filePath = join(__dirname, "index.css");
            contentType = "text/css";
            break;
        case "/index.js":
            filePath = join(__dirname, "index.js");
            contentType = "application/javascript";
            break;
        case "/index.js.map":
            filePath = join(__dirname, "index.js.map");
            contentType = "application/json";
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
            return;
    }
    serveFile(filePath, contentType, res);
});

const wss = new WebSocketServer({ server: httpServer });

const engine = new InsightEngine();

wss.on("connection", (ws) => {

    const reset: Reset = {
        type: Operation.Reset,
        payload: engine.insights()
    }; 
    ws.send(JSON.stringify(reset));

    const interval = setInterval(() => {
        const changeset = engine.mutate();
        if (changeset.type !== Operation.NoOp) {
            ws.send(JSON.stringify(changeset));
        }
    }, 1000);

    ws.on("close", () => {
        clearInterval(interval);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
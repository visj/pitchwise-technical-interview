// src/server.ts
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { readFile } from "fs";
import { join } from "path";

// src/types.ts
var Operations = [
  1 /* Reset */,
  2 /* AddRows */,
  3 /* DelRows */,
  4 /* SortRows */,
  5 /* AddInsights */,
  6 /* DelInsights */,
  7 /* SortInsights */
];

// src/mock.ts
var actions = [
  "Saved Graph",
  "Printed Presentation",
  "Highlighted Image",
  "Next Page Image",
  "Saved Link",
  "Downloaded Pitchdeck",
  "Exited Slide",
  "Next Page Table",
  "Saved Content",
  "Highlighted Table",
  "Zoomed In Annotation",
  "Zoomed Out Graph",
  "Zoomed Out Link",
  "Removed Bookmark Comment",
  "Previous Page Image",
  "Next Page Annotation",
  "Removed Bookmark Table",
  "Previous Page Table",
  "Sent Feedback Image",
  "Shared Pitchdeck",
  "Highlighted Content",
  "Zoomed Out Link",
  "Copied Attachment",
  "Closed Link",
  "Viewed Snippet",
  "Removed Bookmark Attachment",
  "Exited Table",
  "Opened Video",
  "Closed Video",
  "Previous Page Diagram",
  "Highlighted Pitchdeck",
  "Previous Page Slide",
  "Pasted Link",
  "Exited File",
  "Bookmarked Diagram",
  "Viewed Figure",
  "Shared Annotation",
  "Exited Diagram",
  "Viewed File",
  "Pasted Comment",
  "Printed Diagram",
  "Previous Page File",
  "Printed Chart",
  "Printed Snippet",
  "Bookmarked Snippet",
  "Downloaded Image",
  "Exited Annotation",
  "Zoomed Out Section",
  "Sent Feedback File",
  "Printed Comment",
  "Highlighted Page",
  "Zoomed Out Table",
  "Highlighted Comment",
  "Closed Chart",
  "Sent Annotation",
  "Saved Image",
  "Sent Feedback Video",
  "Copied File",
  "Bookmarked Snippet",
  "Closed Video",
  "Shared File",
  "Next Page Pitchdeck",
  "Next Page Diagram",
  "Next Page Video",
  "Zoomed Out Section",
  "Highlighted Content",
  "Commented Attachment",
  "Removed Bookmark Diagram",
  "Viewed Section",
  "Zoomed Out Annotation",
  "Zoomed Out Chart",
  "Opened Slide",
  "Highlighted Figure",
  "Zoomed In Comment",
  "Next Page Attachment",
  "Previous Page Annotation",
  "Commented Page",
  "Downloaded Section",
  "Previous Page Annotation",
  "Viewed Snippet",
  "Sent Section",
  "Commented Attachment",
  "Opened File",
  "Commented Attachment",
  "Zoomed In Attachment",
  "Copied Table",
  "Sent Feedback Presentation",
  "Shared Video",
  "Copied Section",
  "Sent Feedback Image",
  "Opened Image",
  "Zoomed In Slide",
  "Next Page Figure",
  "Sent Snippet",
  "Sent Chart",
  "Next Page Link",
  "Bookmarked Annotation",
  "Saved Presentation",
  "Printed Snippet",
  "Sent Chart"
];
var visitors = [
  "Kwesi",
  "Zuberi",
  "Kwesi",
  "Amina",
  "Moyo",
  "Akua",
  "Moyo",
  "Oba",
  "Ngozi",
  "Efe",
  "Amara",
  "Nkechi",
  "Oba",
  "Fatou",
  "Akua",
  "Tunde",
  "Chinwe",
  "Kelechi",
  "Femi",
  "Sekou",
  "Chinwe",
  "Kwesi",
  "Omari",
  "Bayo",
  "Kofi",
  "Obinna",
  "Nia",
  "Ade",
  "Esi",
  "Yemi",
  "Zainab",
  "Kwesi",
  "Imani",
  "Zuberi",
  "Penda",
  "Imani",
  "Moyo",
  "Zuberi",
  "Zola",
  "Gbenga",
  "Imani",
  "Efe",
  "Gbenga",
  "Sade",
  "Zainab",
  "Zola",
  "Amina",
  "Fatou",
  "Ngozi",
  "Chike",
  "Taye",
  "Nia",
  "Malik",
  "Kelechi",
  "Chinwe",
  "Gbenga",
  "Yemi",
  "Zainab",
  "Bayo",
  "Ayo",
  "Nia",
  "Lamine",
  "Imani",
  "Kofi",
  "Ngozi",
  "Obinna",
  "Nia",
  "Gbenga",
  "Gbenga",
  "Zola",
  "Efe",
  "Lamine",
  "Juma",
  "Efe",
  "Amara",
  "Moyo",
  "Amara",
  "Obinna",
  "Lamine",
  "Omari",
  "Zola",
  "Omari",
  "Akua",
  "Ade",
  "Zuberi",
  "Malik",
  "Zola",
  "Nkechi",
  "Juma",
  "Obinna",
  "Fatou",
  "Ngozi",
  "Gbenga",
  "Ade",
  "Penda",
  "Nia",
  "Omari",
  "Obinna",
  "Zainab",
  "Amina"
];

// src/Engine.ts
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gaussianRandom(mean, stdev) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return z * stdev + mean;
}
function generateInsightRow() {
  return {
    id: Math.floor(Math.random() * 1e8),
    name: visitors[Math.floor(Math.random() * visitors.length)],
    action: actions[Math.floor(Math.random() * actions.length)]
  };
}
function generateInsight() {
  const numRows = Math.max(1, gaussianRandom(25, 10));
  return {
    title: `Pitchdeck ${Math.floor(Math.random() * 1e3)}`,
    rows: Array.from({ length: numRows }, generateInsightRow)
  };
}
var InsightEngine = class {
  _insights;
  constructor() {
    this._insights = this.resetInsights();
  }
  resetInsights() {
    return Array.from({ length: 3 }, generateInsight);
  }
  insights() {
    return this._insights;
  }
  /**
   * TODO Add implementation below
   * @returns 
   */
  mutate() {
    const length = this._insights.length;
    const operation = this.getRandomOperation();
    switch (operation) {
      case 2 /* AddRows */: {
      }
      case 3 /* DelRows */: {
      }
      case 4 /* SortRows */: {
      }
      case 5 /* AddInsights */: {
      }
      case 6 /* DelInsights */: {
      }
      case 7 /* SortInsights */: {
      }
    }
    return { type: 0 /* NoOp */ };
  }
  getRandomOperation() {
    return Operations[getRandomNumber(2 /* AddRows */, 7 /* SortInsights */)];
  }
};

// src/server.ts
var __dirname = import.meta.dirname;
var PORT = 8080;
function serveFile(filePath, contentType, res) {
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
var httpServer = createServer((req, res) => {
  let filePath;
  let contentType;
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
var wss = new WebSocketServer({ server: httpServer });
var engine = new InsightEngine();
wss.on("connection", (ws) => {
  const reset = {
    type: 1 /* Reset */,
    payload: engine.insights()
  };
  ws.send(JSON.stringify(reset));
  const interval = setInterval(() => {
    const changeset = engine.mutate();
    if (changeset.type !== 0 /* NoOp */) {
      ws.send(JSON.stringify(changeset));
    }
  }, 1e3);
  ws.on("close", () => {
    clearInterval(interval);
  });
});
httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map

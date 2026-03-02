import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (...parts) => path.resolve(__dirname, ...parts);

const routes = ["/", "/work", "/about", "/writing", "/side-projects", "/shelf"];

const templatePath = resolve("dist", "index.html");
const serverEntryPath = resolve("dist", "server", "entry-server.js");

if (!fs.existsSync(templatePath)) {
  throw new Error("Missing dist/index.html. Run the client build first.");
}

if (!fs.existsSync(serverEntryPath)) {
  throw new Error("Missing dist/server/entry-server.js. Run the server build first.");
}

const template = fs.readFileSync(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);

for (const route of routes) {
  const appHtml = render(route);
  const html = template.replace("<!--ssr-outlet-->", appHtml);

  const filePath =
    route === "/"
      ? resolve("dist", "index.html")
      : resolve("dist", route.slice(1), "index.html");

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, "utf8");
  console.log(`prerendered ${route} -> ${path.relative(resolve("dist"), filePath)}`);
}

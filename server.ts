import http from "node:http";

import next from "next";

import { registerSocketServer } from "./socket";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

async function bootstrap() {
  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  await app.prepare();

  const server = http.createServer((req, res) => handle(req, res));
  registerSocketServer(server);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`FreelanceHub running on http://${hostname}:${port}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start FreelanceHub", error);
  process.exit(1);
});

import type { Server as HttpServer } from "node:http";

import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export function registerSocketServer(server: HttpServer) {
  if (io) {
    return io;
  }

  io = new SocketIOServer(server, {
    path: "/api/socket/io",
    cors: {
      origin: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join:user", (userId: string) => {
      socket.join(`user:${userId}`);
    });
  });

  return io;
}

export function getSocketServer() {
  return io;
}

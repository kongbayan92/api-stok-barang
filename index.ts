import http from "http";
import app from "./app";

const server: any = http.createServer(app);

server.listen(4000, (): void => {
  console.log("Server running on port 4000")
})
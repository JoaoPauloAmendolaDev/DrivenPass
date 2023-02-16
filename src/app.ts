import { connectDB, disconnectDB, loadEnv } from "@/config";
import express, {Express} from "express";
import cors from "cors";
import usersRouter from "./routes/user-routes";


loadEnv()

const app = express()

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("server running OK"))
  .use("/", usersRouter)

export function init(): Promise<Express> {
    connectDB()
    return Promise.resolve(app)
}

export async function close(): Promise<void>{
    await disconnectDB()
}

export default app
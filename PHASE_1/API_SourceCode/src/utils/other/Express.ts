import express, { Express, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getLogger } from "../Logger";
// e.g. import video from "../controllers";

export const setupExpress = (): Express => {
  const router = Router();
  // Setup Routes
  // e.g. video(router);

  const app = express()
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(router);

  getLogger().info("Setup Express");
  return app;
};

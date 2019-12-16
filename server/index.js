const next = require("next");
// Express middleware
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
// Feathers
const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });

nextApp.prepare().then(() => {
  const app = express(feathers());
  const handle = nextApp.getRequestHandler();

  const port = 3000;

  // Load app configuration
  app.configure(configuration());
  app.use(helmet());
  app.use(cors());
  app.use(compress());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.configure(express.rest());

  // Bypass Feathers middleware
  app.configure(app =>
    app.get("*", (req, res, next) => {
      return req.path === "/feathers" ? next() : handle(req, res);
    })
  );

  app.use(express.notFound());

  // Start the server
  const server = app.listen(port);

  process.on("unhandledRejection", (reason, p) =>
    console.log("Unhandled Rejection at: Promise ", p, reason)
  );

  server.on("listening", () =>
    console.log(`Feathers application started on http://localhost:${port}`)
  );
});

const express = require("express");
const GenerationEngine = require("./generation/engine");
const dragonRouter = require("./api/dragon");
const generationRouter = require("./api/generation");

const app = express();
const engine = new GenerationEngine();

// makes engine dispo to all files
app.locals.engine = engine;

app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);

engine.start();

module.exports = app;

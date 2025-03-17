import express from "express";
import path from "path";

const configViewEngine = (app) => {
  const staticPath = path.join(process.cwd(), "src", "public");
  app.use(express.static(staticPath));

  app.set("view engine", "ejs");
  const viewsPath = path.join(process.cwd(), "src", "views");
  app.set("views", viewsPath);
};

export default configViewEngine;

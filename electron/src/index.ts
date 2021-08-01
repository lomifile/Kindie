const { app, BrowserWindow, Notification } = require("electron");
import path from "path";
import { __prod__ } from "./Constants";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DV Organizator",
    webPreferences: {
      devTools: !__prod__,
      nodeIntegration: true,
      preload: path.join(__dirname + "/preload.js"),
    },
  });

  !__prod__
    ? mainWindow.loadURL("http://localhost:3000/dashboard")
    : mainWindow.loadURL("https://dv-organizator.vercel.app/dashboard"); // prod
};

const showNotification = () => {
  new Notification({
    title: "App is ready",
  }).show();
};

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .then(showNotification);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

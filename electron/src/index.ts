const { app, BrowserWindow, Notification } = require("electron");
import path from "path";
import { __prod__ } from "./Constants";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Kindie",
    webPreferences: {
      devTools: !__prod__,
      nodeIntegration: true,
      preload: path.join(__dirname + "/preload.js"),
      icon: __dirname + "../public/favicon.ico",
    },
  });

  mainWindow.setMenu(null);

  !__prod__
    ? mainWindow.loadURL("http://localhost:3000/dashboard")
    : mainWindow.loadURL("https://kindieapi.xyz/dashboard"); // prod
};

const showNotification = () => {
  new Notification({
    title: "Kindie is ready",
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

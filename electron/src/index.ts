const { app, BrowserWindow, Notification } = require("electron");
import path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DV Organizator",
    icon: __dirname + "../img/logo.ico",
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: path.join(__dirname + "../dist/preload.js"),
    },
  });
  mainWindow.loadURL("http://localhost:3000/dashboard");
  // mainWindow.loadURL("https://dv-organizator.vercel.app/login"); // prod
}

const showNotification = () => {
  new Notification({
    title: "App is ready",
    message: "Your DV Organizator app is ready",
  }).show();
};

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .then(showNotification);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

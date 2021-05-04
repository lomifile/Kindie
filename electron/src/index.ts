const {app, BrowserWindow} = require("electron");
import { contextBridge } from "electron";

function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title:"DV Organizator",

        webPreferences: {
            devTools: false,
            nodeIntegration: true,
        },
    });

    // mainWindow.loadURL("http://localhost:3000/login");
    mainWindow.loadURL("https://dv-organizator.vercel.app/login"); // prod
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
}).catch((err: any) => {
    console.error(err);
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
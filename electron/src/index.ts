const {app, BrowserWindow} = require("electron");
import path from 'path'

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title:"DV Organizator",
        icon: __dirname + "/img/logo.png",
        webPreferences: {
            devTools: false,
            nodeIntegration: true,
            preload: path.join(__dirname + '../dist/preload.js')
        },
    });

    mainWindow.loadURL("http://localhost:3000/login");
    // mainWindow.loadURL("https://dv-organizator.vercel.app/login"); // prod
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
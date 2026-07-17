const { parseHTML } = require("linkedom");
const { document } = parseHTML('');
const fs = require('node:fs');

const release = {
    version: "0.0.2",
    name: "lonkos",
    stylename: "LonkOS"
}
const data = {
    username: "user",
    files: {
        "home": {id: "dir", in: []},
        "notes.txt": { id: "file", in: ""}
    },
    editfile: "notes.txt",
    webfile: "/home/preview.html",
    filedir: "home",
    consoledir: "/",
    console: [
        `${release.stylename} ${release.version}`,
        "type `help` for commands"
    ],
    appCfg: [
        { id: "console", title: "Console", render: "renderConsole" },
        { id: "editor", title: "Editor", render: "renderEditor" },
        { id: "files", title: "Filesystem", render: "renderFiles" },
        { id: "processes", title: "Processes", render: "renderProcesses" },
        { id: "preview", title: "Browser", render: "renderBrowser" },
        { id: "appstore", title: "App Store", render: "renderAppstore" }
    ],
    windows: {
        console: { x: 24, y: 24, w: 570, h: 360, open: true },
        editor: { x: 620, y: 24, w: 560, h: 420, open: true },
        files: { x: 24, y: 408, w: 470, h: 310, open: true },
        browser: { x: 520, y: 468, w: 560, h: 320, open: true },
        appstore: { x: 520, y: 468, w: 560, h: 320, open: true },
    },
    lastExport: ""
};
//getFile("notes.txt", data.files);
//getDir("home", data.files);
buildLonkOS();
for (let i in Object.keys(data.files)) {
    let key = Object.keys(data.files)[i];
    if (data.files[key].id === "file") {
        getFile(key, data.files);
    } else if (data.files[key].id === "dir") {
        getDir(key, data.files);
    }
};

function getFile(locaten, files) {
    fs.readFile(`./root/${locaten}`, 'utf8', (err, dat) => {
        if (err) { console.error(err);return; };
        files[locaten]["in"] = dat;
    });
};
function getDir(locaten, files) {
    fs.readdir(`./root/${locaten}`, (err, dat) => {
        if (err) { console.error(err);return; };
        files[locaten]["in"] = dat;
    });
};
function windowsb() {
    let windows = [];
    for (let [name, windat] of Object.entries(data.windows)) {
        name = data.appCfg.find(cfg => cfg.id === name)?.title || name;
        windows.push(windowb(windat, name));
        console.log(Object.entries(data.windows));
    }
    return windows;
}
function windowb(windat, name) {
    let window = document.createElement('article');
    window.className = "window";
    window.setAttribute("data-app", name);
    window.setAttribute("data-focused", `${windat.open}`);
    window.style.left = `${windat.x}px`;
    window.style.top = `${windat.y}px`;
    window.style.width = `${windat.w}px`;
    window.style.height = `${windat.h}px`;
    window.style.zIndex = `${windat.open ? 1 : 0}`;
    window.innerHTML = `
        <header class="titlebar">
            <span class="title">${name}</span>
            <div class="lights">
                <button class="light close" title="Close" aria-label="Close"></button>
                <button class="light min" title="Minimize" aria-label="Minimize"></button>
                <button class="light max" title="Maximize" aria-label="Maximize"></button>
            </div>
        </header>
        <section class="content"></section>
        <span class="resize-handle resize-n"></span>
        <span class="resize-handle resize-e"></span>
        <span class="resize-handle resize-s"></span>
        <span class="resize-handle resize-w"></span>
        <span class="resize-handle resize-ne"></span>
        <span class="resize-handle resize-nw"></span>
        <span class="resize-handle resize-se"></span>
        <span class="resize-handle resize-sw"></span>
    `
    return window.outerHTML;
};

function getHTML() { return fs.readFileSync("./LonkOS.html"); };
function getCSS() { return fs.readFileSync("./style.css"); };

function buildURL(filePath, mimeType) {
    let fileBuffer = fs.readFileSync(filePath);
    let base64String = fileBuffer.toString('base64').replace(/\s/g, '');
    return `data:${mimeType};base64,${base64String}`;
}
function buildFile() {
    let html = getHTML().toString();
    let css = getCSS().toString();
    html = html.replace(`<link rel="stylesheet" href="style.css">`, `<style>${css}</style>`);
    let tabs = windowsb();
    tabs.forEach(tab => {
        html = html.replace('<!-- WINDOWS -->', `<!-- WINDOWS -->${tab}`);
    });
    html = html.replace('<!-- WINDOWS -->', ``);
    return html.replace(`<link rel="stylesheet" href="style.css">`, `<style>${css}</style>`);
};

function buildLonkOS() {
    fs.writeFile('./builds/LonkOS.html', buildFile(), err => {
        if (err) { console.error(err); } else { console.log(`Wrote URL File (Builds/LonkOS.html)`) }
    });
    fs.writeFile('./builds/LonkOS.url', buildURL('./builds/LonkOS.html', 'text/html'), err => {
        if (err) { console.error(err); } else { console.log(`Wrote URL File (Builds/LonkOS.URL)`) }
    });
    
    console.log(`LonkOS is still in development.`);
};
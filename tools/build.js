const fs = require('node:fs');

const release = {
    version: "0.0.5",
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
        { id: "preview", title: "Browser", render: "renderBrowser" }
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
getFile("notes.txt", data.files);
getDir("home", data.files);

function getFile(locaten, files) {
    fs.readFile(`./root/${locaten}`, 'utf8', (err, dat) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(dat);
        files[locaten]["in"] = dat;
        console.log(data.files);
    });
};

function getDir(locaten, files) {
    fs.readdir(`./root/${locaten}`, (err, dat) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("data:");
        console.log(dat);
        files[locaten]["in"] = dat;
        console.log(data.files);
    });
};

function getHTML() {
    return fs.readFileSync("./LonkOS.html");
};

function buildFile(filePath, mimeType) {
    let fileBuffer = fs.readFileSync(filePath);
    let base64String = fileBuffer.toString('base64').replace(/\s/g, '');
    return `data:${mimeType};base64,${base64String}`;
}

fs.writeFile('./builds/LonkOS.url', buildFile('./LonkOS.html', 'text/html'), err => {
    if (err) { console.error(err); } else { console.log(`Wrote URL File (Builds/LonkOS.URL)`) }
});
fs.writeFile('./builds/LonkOS.html', getHTML(), err => {
    if (err) { console.error(err); } else { console.log(`Wrote URL File (Builds/LonkOS.html)`) }
});
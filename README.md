# lonkOS
a semi-fork of linkOS, with a Debian-style UI instead of an Ubuntu-style UI.

# building
## dependencies
### Windows
```
    winget install nodejs
    node -v
    npm install linkedom
    npm install open
    npm install ws
```
### Linux
```
    sudo apt install nodejs
    node -v
    npm install linkedom
    npm install ws
```
## build
```
    git clone https://github.com/aeryli/lonkOS.git
    cd lonkOS
    npm run build
```
## run
```
    cd builds
    npm run launcher
```

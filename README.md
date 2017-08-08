# Evaluation

## Platform recommendations

The setup has been verified to run correctly with:

- Node.js v8.1.3
- NPM v5.0.3
- Chrome Browser 60.0.3112.90
- Firefox 55.0

**Please note: Only NPM 5 will install the exact same dependencies as specified in the `package-lock.json`. Older NPM versions might install different versions than the verified test setup.**

## SPA implementation

### Installation

1. Inside the `spa` folder, execute `npm install` to install all dependencies
2. Run `npm start`
3. Open [http://localhost:3000](http://localhost:3000)
4. Use "jhnns" and "password" as login credentials

## Universal implementation

### Installation

1. Inside the `universal` folder, execute `npm install` to install all dependencies
2. Run `npm start`
3. Open [http://localhost:3000](http://localhost:3000)
4. Use "jhnns" and "password" as login credentials

### Note on folder structure

- `app` contains all the code that is going to be processed by the bundler.
- `app/client` represents the client app entry.
- `app/server` represents the server app entry.
- `app/components` contains components, views and states. They have been coalesced by features. The folder name "components" refers here to its original meaning "self-contained part of a larger entity".
- `app/routes` contains route handlers.
- `server` is the server entry.
- `server/api` roughly equals the server data layer.
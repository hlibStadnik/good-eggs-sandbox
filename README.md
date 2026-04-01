# Good Eggs Sandbox

Expo React Native app with Stripe/Klarna payment integration.

## Prerequisites

- Node.js
- pnpm
- Expo CLI (`npm i -g expo-cli`)
- iOS Simulator / Android Emulator or a physical device

## 1. Install dependencies

```bash
pnpm install
```

## 2. Start the backend

```bash
cd backend
npm install
npm start
```

The server runs on `http://localhost:3003`.

## 3. Start the app

```bash
# Expo dev server
npm start

# iOS
npm ios

# Android
npm android
```

> Make sure the backend is running before launching the app.

# Crypto Hustle - Terminal Dashboard

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## Overview

Crypto Hustle is a real-time cryptocurrency telemetry tracking application designed for active monitor setups. It mimics the stark, high-density look of a classic retro Bloomberg Terminal to deliver fast, highly scannable financial data on the top 30 digital assets.

The application solves the problem of modern dashboard fatigue by stripping out bloated tracking animations and high-overhead assets. Instead, it leverages ultra-light structural CSS shimmer states, localized event prop isolation, and an alternate query-string ingestion pipeline that bypasses standard CORS preflight restrictions often encountered inside cloud sandbox workstations.

## Visuals

![Screenshot](/public/imgs/1.png)
---
![Screenshot](/public/imgs/2.png)
---
![Screenshot](/public/imgs/3.png)

## Installation

Follow these step-by-step instructions to get your local development environment running.

### 1. System Requirements

Ensure you have Node.js (v18.0.0 or higher) installed on your system.

### 2. Clone and Install Dependencies

Clone your repository directory, move into the project root folder, and install the required modules using `npm`:

```bash
git clone https://github.com/DeveloperThierry/crypto-hustle.git
cd crypto-hustle
npm install
```

### 3. Environment Configurations

Create a `.env` file in the root root of your project folder to safely house your application API credentials:

```env
VITE_APP_COIN_GECKO_API_KEY=your_coingecko_demo_api_key
VITE_APP_CRYPTO_COMPARE_API_KEY=your_cryptocompare_api_key
```

## Usage

### Local Development Engine

To spin up the local development engine with hot-reloading active, run the following command:

```bash
npm run dev
```

Once initialized, the terminal layout will be accessible locally at `http://localhost:5173`.

### Bundling for Production Deployments

To compile and optimize your static application assets for a live cloud environment (e.g., Vercel, Netlify), build the project using:

```bash
npm run build
```

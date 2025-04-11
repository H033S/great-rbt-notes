# RBT Notes Client Application

A React-based client application for managing Registered Behavior Technician (RBT) notes and reports.

## Requirements

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- Environment files:
  - `.env.test` for test environment
  - `.env.development` for development environment

## Installation
1. Install dependencies:
```bash
npm install
```

## Environment Setup
The application requires two environment files in the root directory:
1. `.env.test` - For test environment:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/test/report
```
2. `.env.development` - For development environment:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1/report
```

## Running the Application

### Development Mode (Report Environment)
```bash
npm run dev:report
```
This will run the application in development mode but will hit OPENAI Endpoint

### Test Mode
```bash
npm run dev:test
```
This will run the application in development mode but will hit Test Endpoint

The application will be available at:
- Local: http://localhost:3000
- Network: http://[your-local-ip]:3000

## Available Scripts
- `npm run dev:test` - Runs the app in test environment
- `npm run dev:report` - Runs the app in report environment
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app
- `npm run lint` - Runs ESLint

## Features
- Report generation
- PDF export functionality
- Modern UI with Lucide icons

## Dependencies
- Next.js - React framework
- React - UI library
- html2pdf.js - PDF generation
- Lucide React - Icon library

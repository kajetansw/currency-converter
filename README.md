# Currency Converter

A web application for converting currencies, similar to the one on Google.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kajetansw/currency-converter.git
cd currency-converter
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your access key:

```
VITE_API_KEY=your_access_key_here
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- React 19
- TypeScript
- Tanstack Query

## API Reference

This project uses [Currency Beacon API](https://currencybeacon.com/api-documentation) for fetching currencies and convertions.

## Architecture design choices

If you find the solution a bit bloated in terms of lines of code, then yes, it probably is.

I implemented two solutions (other one is on the `feat/using-state` branch), but decided to put forward this intentionally. I think that despite more lines of code, all of components, hooks and logic are more readable, managable and composable with this solution.

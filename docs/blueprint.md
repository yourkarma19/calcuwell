# CalcPro - The Ultimate Calculator Suite

## 1. Overview

**CalcPro** is a comprehensive, user-friendly suite of online calculators designed to serve a wide range of needs, from simple arithmetic to complex financial and scientific calculations. Built with Next.js, TypeScript, and styled with Tailwind CSS and ShadCN UI components, CalcPro offers a fast, reliable, and aesthetically pleasing experience. The app features a powerful global search, persistent form states, and an AI-powered tool to explain complex formulas.

## 2. Core Features

### 2.1. Global Search

- **Technology**: Fuzzy search with `fuse.js`.
- **Functionality**: A global search bar will be prominently displayed in the header. As the user types, it will instantly suggest calculators and categories that match the query.
- **User Experience**: The search will be fast and forgiving, handling typos and partial matches to help users find the right tool quickly.

### 2.2. Diverse Calculator Categories

The application will feature a wide array of calculators organized into intuitive categories:

- **Math**: Basic arithmetic, fractions, percentages, geometry (area, volume), algebra (equation solvers), trigonometry, and statistics (mean, median, mode).
- **Finance**: Loan EMI, mortgage, compound interest, investment ROI, savings, retirement, and inflation calculators.
- **Health**: BMI, BMR, daily calorie needs, body fat percentage, and pregnancy due date calculators.
- **Programming**: Binary/decimal/hex converter, Base64 encoder/decoder, and IP subnet calculator.
- **Conversions**: Converters for length, weight, temperature, data storage, and more.
- **Date & Time**: Age calculator, date difference, time zone converter, and countdown timer.

### 2.3. Responsive Design & Mobile-First Keypad

- **Technology**: Tailwind CSS for responsive utility classes.
- **Functionality**: The layout will adapt seamlessly to mobile, tablet, and desktop screens. For calculators requiring numerical input (like the basic calculator), a custom, mobile-friendly numeric keypad will be displayed to enhance usability on touch devices.

### 2.4. Persistent Forms

- **Technology**: `localStorage` and a custom React hook (`usePersistentState`).
- **Functionality**: When a user enters data into a calculator form, the values will be automatically saved to their browser's local storage. Upon returning to that calculator, the form will be pre-filled with their last-used values, saving them from re-entering data.

### 2.5. Theme Toggle

- **Technology**: `next-themes`.
- **Functionality**: Users can switch between light and dark themes. Their preference will be saved in local storage and applied on subsequent visits.

### 2.6. AI-Powered Formula Explanations

- **Technology**: Genkit AI.
- **Functionality**: For select calculators with complex formulas (e.g., compound interest, loan EMI), an "Explain Formula" button will be available. Clicking this will trigger an AI-powered agent to provide a simple, clear explanation of the formula, how it works, and what each variable represents.

## 3. Style Guidelines

- **Primary Color**: Soft indigo (`#756AB6`) for a calm, intellectual, and modern feel.
- **Background Color**: Very light grayish-indigo (`#F0F0F5`) for a clean, spacious look.
- **Accent Color**: Muted violet (`#A69CAC`) for interactive elements like buttons and links.
- **Font Pairing**:
  - **Headings**: `Space Grotesk` (sans-serif) - provides a modern, slightly technical feel.
  - **Body Text**: `Inter` (sans-serif) - a highly readable and neutral font for all other text.
- **Iconography**: Minimal and consistent icons from `lucide-react` for calculator categories and actions.
- **Layout**: Clean, spacious layout with rounded cards and subtle shadows for a modern aesthetic.
- **Animations**: Subtle transitions and animations (e.g., on hover states, search results) using `framer-motion` to enhance the user experience without being distracting.

## 4. Technical Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Search**: Fuse.js
- **State Management**: React Hooks (useState, useMemo, etc.), custom hook for local storage.
- **AI**: Genkit

## 5. SEO & Performance

- **Static Site Generation (SSG)**: Calculator pages will be statically generated at build time for maximum performance and SEO benefits.
- **Metadata**: Each calculator page will have unique, descriptive `title` and `meta description` tags to improve search engine rankings.
- **Clean URLs**: User-friendly and descriptive URLs (e.g., `/calculators/loan-emi-calculator`).
- **Image Optimization**: `next/image` will be used for all images to ensure they are served in modern formats and correctly sized.

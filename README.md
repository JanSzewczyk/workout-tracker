<div align="center">

# 💪📱 Workout Tracker

[![GitHub Stars](https://img.shields.io/github/stars/JanSzewczyk/workout-tracker?style=flat-square)](https://github.com/JanSzewczyk/workout-tracker/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-latest-blue?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-black?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**A comprehensive mobile fitness tracking application built with React Native and Expo — track your workouts, monitor progress, and achieve your fitness goals! 🏋️‍♂️🎯**

[✨ Features](#-features) • [🎯 Getting Started](#-getting-started) • [📖 Table of Contents](#-table-of-contents) • [📱 Screenshots](#-screenshots) • [🤝 Contributing](#-contributing)

</div>

---

## 👋 Welcome to Workout Tracker!

Hey there, fitness enthusiast! 🎉 Welcome to **Workout Tracker** — your ultimate companion for tracking workouts, monitoring fitness progress, and achieving your health goals through a beautifully designed mobile experience!

### 🎯 What is Workout Tracker?

Workout Tracker is a powerful, user-friendly mobile application designed to help you log exercises, track your fitness journey, and stay motivated. Built with React Native and Expo, it provides a seamless cross-platform experience for iOS and Android users who want to take control of their fitness routine.

### 💡 The Problem It Solves

Staying consistent with fitness goals requires:
- **Easy Workout Logging** — Quick and intuitive exercise tracking
- **Progress Monitoring** — Visual insights into your fitness journey
- **Motivation** — Clear goals and achievement tracking
- **Accessibility** — Track workouts anytime, anywhere on your phone
- **Data Organization** — Structured workout history and statistics
- **Personalization** — Customizable routines and exercises

### ✅ The Solution

Workout Tracker provides:
- 📊 **Comprehensive Tracking** — Log exercises, sets, reps, and weights
- 📈 **Progress Analytics** — Visualize your fitness improvements over time
- 🎯 **Goal Setting** — Set and track personal fitness objectives
- 🏋️ **Exercise Library** — Pre-built exercises with instructions
- 📅 **Workout Calendar** — Plan and schedule your training sessions
- 💪 **Custom Routines** — Create and save your favorite workouts
- 📱 **Offline Support** — Track workouts without internet connection

### 🌟 What Makes It Special?

- **Native Performance** — Built with React Native for smooth, responsive experience
- **Cross-Platform** — Works seamlessly on iOS and Android
- **Modern UI** — Clean, intuitive interface designed for fitness enthusiasts
- **Expo Powered** — Fast development and easy updates
- **Type-Safe** — Full TypeScript support for reliability
- **Offline First** — Track workouts even without internet
- **Privacy Focused** — Your fitness data stays on your device

---

## ✨ Features

### 💪 Workout Management

- **Exercise Logging** — Quick entry for exercises, sets, reps, and weight
- **Workout Templates** — Save and reuse favorite workout routines
- **Rest Timers** — Built-in rest timer between sets
- **Exercise Library** — Comprehensive database of exercises with instructions
- **Custom Exercises** — Add your own exercises with descriptions
- **Workout History** — Complete log of all past workouts

### 📊 Progress Tracking

- **Statistics Dashboard** — Visual overview of your fitness progress
- **Exercise Analytics** — Track personal records and improvements
- **Body Metrics** — Log weight, body measurements, and more
- **Progress Photos** — Track visual changes over time
- **Achievement System** — Unlock milestones and stay motivated
- **Export Data** — Download your workout history

### 🎯 Goal Setting

- **Fitness Goals** — Set weight, strength, or endurance targets
- **Goal Tracking** — Monitor progress toward your objectives
- **Reminders** — Get notifications for scheduled workouts
- **Streak Counter** — Track workout consistency
- **Motivational Insights** — Personalized encouragement

### 🚀 Core Technologies

- **React Native** — Cross-platform mobile framework
- **Expo SDK 54** — Managed workflow with modern features
- **TypeScript** — Full type safety across the codebase
- **Expo Router** — File-based navigation system
- **AsyncStorage** — Local data persistence
- **Expo Notifications** — Workout reminders

### 🎨 User Experience

- **Intuitive UI** — Clean, easy-to-navigate interface
- **Dark Mode** — Eye-friendly theme for gym environments
- **Responsive Design** — Optimized for all screen sizes
- **Smooth Animations** — Polished transitions and feedback
- **Accessibility** — Designed for all users
- **Fast Performance** — Optimized for quick workout logging

### 🧹 Code Quality

- **TypeScript** — Static type checking for reliability
- **ESLint** — Code quality enforcement
- **Prettier** — Consistent code formatting
- **Modular Architecture** — Clean, maintainable codebase
- **Best Practices** — Following React Native conventions

### 📱 Platform Support

- ✅ **iOS** — Native iOS app experience
- ✅ **Android** — Native Android app experience
- ✅ **Expo Go** — Quick testing with Expo Go app

---

## 📖 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
    - [Prerequisites](#-prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Tech Stack](#️-tech-stack)
- [Testing](#-testing)
- [Styling](#-styling)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🎯 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Description |
|------------|---------|-------------|
| **Node.js** | 18.x or higher | JavaScript runtime environment |
| **npm/yarn/pnpm** | Latest | Package manager of your choice |
| **Git** | Latest | Version control system |
| **Expo CLI** | Latest | Expo command-line tools |

#### Platform-Specific Requirements

<details>
<summary><b>🍎 iOS Development (macOS only)</b></summary>

- **Xcode 14+** — [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **iOS Simulator** — Included with Xcode
- **CocoaPods** — Installed automatically by Expo

</details>

<details>
<summary><b>🤖 Android Development</b></summary>

- **Android Studio** — [Download](https://developer.android.com/studio)
- **Android SDK** — API 33+ required
- **Android Emulator** — Or physical device with USB debugging

</details>

### Installation

Follow these steps to get your development environment running:

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/JanSzewczyk/workout-tracker.git
cd workout-tracker
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

Or use your preferred package manager:

```bash
# Using yarn
yarn install

# Using pnpm
pnpm install
```

#### 3️⃣ Configure Environment Variables (Optional)

If the project uses environment variables, create a `.env.local` file:

```bash
cp .env.example .env.local
```

See [Environment Variables](#-environment-variables) section for details.

### Running the App

#### Start the Development Server

```bash
npx expo start
```

This will start the Expo development server and show a QR code with options.

#### Run on iOS Simulator (macOS only)

```bash
# Using Expo CLI
npx expo start --ios

# Or press 'i' in the terminal after starting the dev server
```

#### Run on Android Emulator

```bash
# Using Expo CLI
npx expo start --android

# Or press 'a' in the terminal after starting the dev server
```

#### Run on Physical Device

1. Install **Expo Go** app on your device:
    - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
    - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in the terminal with:
    - **iOS:** Camera app
    - **Android:** Expo Go app

3. The app will open in Expo Go

#### Reset Project (Optional)

To start with a clean slate:

```bash
npm run reset-project
```

This moves the starter code to `app-example` directory and creates a blank `app` directory.

---

## 🔐 Environment Variables

This project may use environment variables for configuration.

### Configuration Template

Create a `.env.local` file in the root directory:

```env
# ==============================================
# APP CONFIGURATION
# ==============================================
EXPO_PUBLIC_APP_NAME=Workout Tracker
EXPO_PUBLIC_APP_VERSION=1.0.0

# ==============================================
# API CONFIGURATION (if applicable)
# ==============================================
# EXPO_PUBLIC_API_URL=https://api.example.com
# EXPO_PUBLIC_API_KEY=your_api_key_here

# ==============================================
# ANALYTICS (optional)
# ==============================================
# EXPO_PUBLIC_ANALYTICS_ID=your_analytics_id

# ==============================================
# FEATURE FLAGS
# ==============================================
# EXPO_PUBLIC_ENABLE_ANALYTICS=false
# EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true
```

### Important Notes

⚠️ **Expo requires public environment variables to be prefixed with `EXPO_PUBLIC_`**

- ✅ `EXPO_PUBLIC_API_URL` — Will be available in the app
- ❌ `API_URL` — Will NOT be available in the app

🔒 **Never commit `.env.local` or files containing secrets!**

Only commit `.env.example` with placeholder values.

### Using Environment Variables

```typescript
// Access environment variables in your code
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const appName = process.env.EXPO_PUBLIC_APP_NAME;
```

---

## 📃 Available Scripts

### 🚀 Development

| Command | Description |
|---------|-------------|
| `npx expo start` | Start Expo development server |
| `npx expo start --ios` | Run on iOS simulator |
| `npx expo start --android` | Run on Android emulator |
| `npx expo start --web` | Run in web browser |
| `npm run reset-project` | Reset to clean project structure |

### 🧹 Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

### 📦 Build & Deployment

| Command | Description |
|---------|-------------|
| `npx expo build` | Build for production |
| `npx eas build` | Build with EAS (Expo Application Services) |

---

## 📁 Project Structure

```
workout-tracker/
│
├── 📁 app/                         # Expo Router file-based routes
│   ├── (tabs)/                     # Tab navigation group
│   │   ├── index.tsx               # Home/Dashboard screen
│   │   ├── workouts.tsx            # Workouts list screen
│   │   ├── progress.tsx            # Progress tracking screen
│   │   └── profile.tsx             # User profile screen
│   ├── workout/                    # Workout related screens
│   │   ├── [id].tsx                # Workout detail screen
│   │   └── new.tsx                 # Create new workout
│   ├── _layout.tsx                 # Root layout
│   └── +not-found.tsx              # 404 screen
│
├── 📁 components/                  # Reusable React components
│   ├── 📁 ui/                      # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── 📁 workout/                 # Workout components
│   │   ├── ExerciseCard.tsx
│   │   ├── SetLogger.tsx
│   │   └── WorkoutList.tsx
│   └── 📁 layout/                  # Layout components
│       ├── Header.tsx
│       └── TabBar.tsx
│
├── 📁 hooks/                       # Custom React hooks
│   ├── useWorkouts.ts
│   ├── useExercises.ts
│   └── useProgress.ts
│
├── 📁 lib/                         # Utilities & helpers
│   ├── storage.ts                  # AsyncStorage helpers
│   ├── utils.ts                    # General utilities
│   └── constants.ts                # App constants
│
├── 📁 types/                       # TypeScript types
│   ├── workout.ts
│   ├── exercise.ts
│   └── user.ts
│
├── 📁 assets/                      # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── 📄 .env.example                 # Environment variables template
├── 📄 app.json                     # Expo app configuration
├── 📄 babel.config.js              # Babel configuration
├── 📄 package.json                 # Dependencies and scripts
├── 📄 tsconfig.json                # TypeScript configuration
└── 📄 README.md                    # Documentation
```

### 📂 Directory Descriptions

- **`app/`** — File-based routing with Expo Router. Each file becomes a screen
- **`components/`** — Reusable React Native components organized by feature
- **`hooks/`** — Custom React hooks for state and logic management
- **`lib/`** — Utility functions, constants, and helper modules
- **`types/`** — TypeScript type definitions and interfaces
- **`assets/`** — Images, fonts, icons, and other static resources

---

## 🛠️ Tech Stack

### 🎯 Core Framework

- **[React Native](https://reactnative.dev/)** — Cross-platform mobile framework
- **[Expo SDK 54](https://expo.dev/)** — Development platform with managed workflow
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[Expo Router](https://docs.expo.dev/router/introduction/)** — File-based navigation

### 📦 Data Management

- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** — Local data persistence
- **[React Context](https://react.dev/reference/react/useContext)** — State management (or alternatives like Zustand)

### 🎨 UI & Styling

- **[React Native StyleSheet](https://reactnative.dev/docs/stylesheet)** — Native styling
- **[Expo Vector Icons](https://icons.expo.fyi/)** — Icon library
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** — Native gestures

### 📊 Data Visualization

- **[React Native Charts](https://github.com/wuxudong/react-native-charts-wrapper)** — Progress charts and graphs
- **Custom Components** — Tailored data visualization

### 🔔 Notifications

- **[Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)** — Workout reminders and alerts

### 🧹 Code Quality

- **[ESLint](https://eslint.org/)** — Code linting
- **[Prettier](https://prettier.io/)** — Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** — Static type checking

### 📦 Additional Libraries

- **expo-font** — Custom font loading
- **expo-haptics** — Haptic feedback
- **expo-image-picker** — Progress photo capture
- **expo-file-system** — Data export functionality

---

## 🧪 Testing

### Testing Strategy

This project can be extended with comprehensive testing:

#### Unit Tests
- Test utility functions and hooks
- Validate data transformations
- Exercise calculations and statistics

#### Integration Tests
- Workout flow testing
- Data persistence verification
- Navigation testing

#### E2E Tests
- Complete user journeys
- Workout creation and logging
- Progress tracking workflows

### Adding Tests

To add testing to this project:

```bash
# Install Jest and React Native Testing Library
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 🎨 Styling

### Styling Approach

This project uses React Native's built-in StyleSheet API for styling:

```typescript
import { StyleSheet, View, Text } from 'react-native';

export default function WorkoutCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Title</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### Design System

The app follows a consistent design system with:
- **Color Palette** — Primary, secondary, and accent colors
- **Typography** — Consistent font sizes and weights
- **Spacing** — Standardized margins and padding
- **Components** — Reusable UI elements

---

## 📱 Screenshots

### App Preview

> [TODO: Add screenshots of your application]

**Planned Screens:**
- Dashboard with workout statistics
- Workout logging interface
- Exercise library
- Progress tracking charts
- User profile and settings

---

## 🔧 Troubleshooting

### Common Issues and Solutions

<details>
<summary><b>❌ Expo CLI not found</b></summary>

**Solution:** Install Expo CLI globally:

```bash
npm install -g expo-cli
```

Or use npx to run commands without installing:
```bash
npx expo start
```

</details>

<details>
<summary><b>❌ Metro bundler issues</b></summary>

**Solution:** Clear the cache and restart:

```bash
npx expo start --clear
```

</details>

<details>
<summary><b>❌ iOS Simulator not launching</b></summary>

**Solution:** Ensure Xcode is installed and configured:

```bash
# Open Xcode and install additional components
xcode-select --install

# Reset iOS simulator
xcrun simctl erase all
```

</details>

<details>
<summary><b>❌ Android build fails</b></summary>

**Solution:** Clean and rebuild:

```bash
cd android
./gradlew clean
cd ..
npx expo start --android
```

</details>

<details>
<summary><b>❌ Dependencies installation fails</b></summary>

**Solution:** Clear cache and reinstall:

```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

</details>

### Getting Help

- 📖 Check [Expo Documentation](https://docs.expo.dev/)
- 💬 Visit [Expo Forums](https://forums.expo.dev/)
- 🐛 Open an issue on [GitHub](https://github.com/JanSzewczyk/workout-tracker/issues)
- 📚 React Native [Documentation](https://reactnative.dev/docs/getting-started)

---

## 🤝 Contributing

Contributions are welcome! Help make Workout Tracker even better! 🎉

### How to Contribute

1️⃣ **Fork the repository**

2️⃣ **Create a feature branch**
```bash
git checkout -b feature/new-exercise-feature
```

3️⃣ **Make your changes**
- Add new features or improvements
- Fix bugs
- Improve documentation
- Enhance UI/UX

4️⃣ **Commit your changes**

```bash
git commit -m "feat: add exercise search functionality"
git commit -m "fix: resolve workout save bug"
git commit -m "docs: update installation guide"
```

5️⃣ **Push to your branch**
```bash
git push origin feature/new-exercise-feature
```

6️⃣ **Open a Pull Request**
- Provide clear description of changes
- Add screenshots for UI changes
- Reference any related issues
- Ensure code follows project standards

### Contribution Guidelines

- ✅ Follow TypeScript and React Native best practices
- ✅ Write clean, readable code
- ✅ Test your changes on both iOS and Android
- ✅ Update documentation as needed
- ✅ Follow existing code style
- ✅ Be respectful and constructive

### Code of Conduct

- Be welcoming and inclusive
- Respect differing viewpoints
- Accept constructive criticism
- Focus on what's best for the community

---

## 📜 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software with proper attribution.

---

## 🙏 Acknowledgments

Built with amazing tools from the React Native ecosystem:

### 🛠️ Core Technologies

- **[Expo Team](https://expo.dev/)** — For the incredible development platform
- **[React Native Community](https://reactnative.dev/)** — For the powerful framework
- **[TypeScript](https://www.typescriptlang.org/)** — For type safety

### 🎨 Design & Inspiration

- Fitness tracking best practices
- Modern mobile UI patterns
- Community feedback and suggestions

### 🌟 Community

- All fitness app developers for inspiration
- Open-source contributors
- Beta testers and early adopters
- The React Native community

---

## 📧 Contact

This project is created and maintained by **Jan Szewczyk**, a passionate React Native developer building practical mobile applications.

- **GitHub**: [@JanSzewczyk](https://github.com/JanSzewczyk)
- **Project Repository**: [github.com/JanSzewczyk/workout-tracker](https://github.com/JanSzewczyk/workout-tracker)

### Support

Found a bug or have a feature request? Please open an issue on GitHub:

[🐛 Report an Issue](https://github.com/JanSzewczyk/workout-tracker/issues)

### Feedback

We'd love to hear your thoughts! Share your experience and suggestions to help improve Workout Tracker for everyone.

---

<div align="center">

**Made with ❤️ by [Jan Szewczyk](https://github.com/JanSzewczyk)**

If this app helped you achieve your fitness goals, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-workout-tracker)

</div>
# Contributing to Growkids FE Project

Thank you for your interest in contributing to this project ❤️  
This document explains how to contribute correctly and consistently.

---

## Prerequisites

Before getting started, make sure you have:

- Node.js >= 18
- npm or yarn
- Expo CLI
- Git

---

## Setup project

Clone the repository and install dependencies:

```bash
git clone https://github.com/nguyendat030805/Growkids-Fe.git
cd Growkids-Fe
npm install
npx expo start
```

# Development workflow

1. Fork the repository

2. Create a new branch from main

3. Make your changes

4. Commit your changes following commit rules

5. Push your branch to your fork

6. Open a Pull Request (PR)

❗ Do NOT push directly to the main branch.

# Branch naming

Use the following naming conventions:

- feat/feature-name – New features

- fix/bug-description – Bug fixes

- docs/update-description – Documentation updates

- refactor/component-name – Code refactoring

- chore/update-config – Tooling or configuration changes

# Examples

- feat/login-screen

- fix/auth-error

- docs/update-readme

Commit messages

This project uses Conventional Commits, enforced by Husky + Commitlint.

# Commit message format

<type>(<scope>): <description>

# Allowed types

- feat – A new feature

- fix – A bug fix

- docs – Documentation only changes

- style – Formatting, missing semicolons, etc.

- refactor – Code changes without fixing bugs or adding features

- perf – Performance improvements

- test – Adding or fixing tests

- chore – Build process or tooling changes

# Examples

```bash
feat(auth): add user authentication
fix(login): resolve validation issue
docs(api): update endpoint documentation
style(core): format code with prettier
refactor(database): optimize queries
test(auth): add unit tests for service
chore(deps): update dependencies
```

# Code standards & tooling

This project enforces code quality using the following tools:

- ESLint: Code is automatically linted before each commit

- Prettier: Code formatting is enforced

- TypeScript: Strict typing is required

- Husky: Git hooks run checks before commit and push

- Commitlint: Commit messages must follow Conventional Commits

Before pushing code, make sure all checks pass.

# Testing

# Run unit tests

npm run test

# Run e2e tests

npm run test:e2e

# Run tests with coverage

npm run test:cov

# Pull Request Process

1. Create feature branch from dev
2. Make your changes
3. Ensure all tests pass
4. Commit with conventional commit format
5. Push to your branch
6. Create Pull Request

# Project Structure

src/
├── core/                 # Shared resources used across the entire app
│   ├── api/              # API configuration (axios instance, interceptors)
│   ├── constants/        # Global constants (colors, fonts, sizes, enums)
│   ├── hooks/            # Reusable custom hooks
│   ├── services/         # Shared services (auth, storage, notifications)
│   ├── utils/            # Utility/helper functions (formatting, validation)
│   └── types/            # Global TypeScript types and interfaces
│
├── features/             # Feature-based modules (business logic by feature)
│   ├── auth/             # Authentication feature
│   ├── profile/          # User profile feature
│   ├── home/             # Home feature
│   └── settings/         # Settings feature
│
├── routes/               # Navigation configuration
│   └── AppNavigator.tsx  # Main app navigation
│
├── app.tsx               # Application entry logic (providers, navigation)

# Git Hooks

- pre-commit: Runs ESLint and Prettier
- commit-msg: Validates commit message format

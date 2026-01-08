# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm start        # Start Expo dev server
pnpm android      # Run on Android emulator
pnpm ios          # Run on iOS simulator
pnpm web          # Run on web browser
pnpm lint         # Run ESLint
```

## Architecture

**Expo React Native app** with file-based routing (Expo Router), i18n support, and Tailwind CSS styling.

### Key Structure

```
app/                    # Expo Router pages (file-based routing)
├── _layout.tsx         # Root layout with providers (GestureHandler, HeroUI, Stack)
├── index.tsx           # Home screen
├── modal.tsx           # Modal screen
└── global.css          # Tailwind/Uniwind styles

lang/                   # Internationalization
├── index.ts            # i18next config (auto-detects device language)
└── locales/
    ├── en-US/translation.json
    └── fr-FR/translation.json
```

### Technology Stack

- **Framework:** Expo SDK 54, React Native 0.81, React 19
- **Routing:** expo-router with typed routes
- **Styling:** Tailwind CSS via Uniwind (`className` prop on RN components)
- **UI Components:** heroui-native
- **i18n:** i18next + react-i18next + expo-localization

### i18n Usage

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
t('home.welcome')           // Get translation
t('home.itemCount', { count: 5 })  // With interpolation
i18n.changeLanguage('fr')   // Switch language
```

Add new languages: create `lang/locales/{locale}/translation.json` and import in `lang/index.ts`.

### Path Alias

`@/*` maps to project root (configured in tsconfig.json).

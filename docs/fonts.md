# Custom Fonts (Outfit) - Documentation

Ce projet utilise la police **Outfit** de Google Fonts via `@expo-google-fonts/outfit` avec HeroUI Native.

## Installation

```bash
npx expo install expo-font @expo-google-fonts/outfit
```

## Configuration

### 1. Chargement des fonts (`app/_layout.tsx`)

```typescript
import { useFonts } from 'expo-font';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  // Attendre le chargement des fonts
  if (!fontsLoaded) {
    return null;
  }

  return (
    <HeroUINativeProvider>
      {/* App content */}
    </HeroUINativeProvider>
  );
}
```

### 2. Variables CSS (`app/global.css`)

```css
@theme {
  --font-normal: 'Outfit_400Regular';
  --font-medium: 'Outfit_500Medium';
  --font-semibold: 'Outfit_600SemiBold';
  --font-bold: 'Outfit_700Bold';
}
```

**Important :** Le nom de la font utilise un underscore `_` (pas un tiret `-`). C'est le format PostScript des Google Fonts Expo.

## Utilisation

### Classes Tailwind

```tsx
<Text className="font-normal">Regular (400)</Text>
<Text className="font-medium">Medium (500)</Text>
<Text className="font-semibold">Semi-bold (600)</Text>
<Text className="font-bold">Bold (700)</Text>
```

### Combinaison avec d'autres styles

```tsx
<Text className="font-bold text-2xl text-gray-900">
  Titre en gras
</Text>

<Text className="font-normal text-base text-gray-600">
  Texte normal
</Text>

<Text className="font-semibold text-white">
  Bouton
</Text>
```

## Mapping des poids

| Classe Tailwind | Variable CSS | Font chargée | Poids |
|-----------------|--------------|--------------|-------|
| `font-normal` | `--font-normal` | `Outfit_400Regular` | 400 |
| `font-medium` | `--font-medium` | `Outfit_500Medium` | 500 |
| `font-semibold` | `--font-semibold` | `Outfit_600SemiBold` | 600 |
| `font-bold` | `--font-bold` | `Outfit_700Bold` | 700 |

## Ajouter d'autres poids

### 1. Importer le poids dans `_layout.tsx`

```typescript
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_300Light,  // Nouveau
  Outfit_800ExtraBold,  // Nouveau
} from '@expo-google-fonts/outfit';

const [fontsLoaded] = useFonts({
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_300Light,
  Outfit_800ExtraBold,
});
```

### 2. Ajouter la variable CSS

```css
@theme {
  --font-light: 'Outfit_300Light';
  --font-normal: 'Outfit_400Regular';
  --font-medium: 'Outfit_500Medium';
  --font-semibold: 'Outfit_600SemiBold';
  --font-bold: 'Outfit_700Bold';
  --font-extrabold: 'Outfit_800ExtraBold';
}
```

## Changer de police

Pour utiliser une autre police (ex: Inter, Poppins) :

### 1. Installer la nouvelle font

```bash
npx expo install @expo-google-fonts/inter
```

### 2. Mettre à jour les imports

```typescript
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
```

### 3. Mettre à jour les variables CSS

```css
@theme {
  --font-normal: 'Inter_400Regular';
  --font-medium: 'Inter_500Medium';
  --font-semibold: 'Inter_600SemiBold';
  --font-bold: 'Inter_700Bold';
}
```

## Poids disponibles pour Outfit

| Poids | Nom | Import |
|-------|-----|--------|
| 100 | Thin | `Outfit_100Thin` |
| 200 | ExtraLight | `Outfit_200ExtraLight` |
| 300 | Light | `Outfit_300Light` |
| 400 | Regular | `Outfit_400Regular` |
| 500 | Medium | `Outfit_500Medium` |
| 600 | SemiBold | `Outfit_600SemiBold` |
| 700 | Bold | `Outfit_700Bold` |
| 800 | ExtraBold | `Outfit_800ExtraBold` |
| 900 | Black | `Outfit_900Black` |

## Splash Screen pendant le chargement

Pour éviter un écran blanc pendant le chargement des fonts :

```typescript
import * as SplashScreen from 'expo-splash-screen';

// Empêche le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    // ...
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (/* ... */);
}
```

## Ressources

- [Expo Google Fonts](https://github.com/expo/google-fonts)
- [HeroUI Native Theming](https://v3.heroui.com/docs/native/getting-started/theming)
- [Outfit sur Google Fonts](https://fonts.google.com/specimen/Outfit)

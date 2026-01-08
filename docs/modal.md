# Modal (FormSheet) - Documentation

Ce projet utilise les **formSheet modals** natifs d'iOS via Expo Router avec des options de personnalisation avancées.

## Configuration

### Fichier layout (`app/_layout.tsx`)

```typescript
<Stack.Screen
  name="modal"
  options={{
    headerShown: false,
    presentation: 'formSheet',
    sheetGrabberVisible: true,
    contentStyle: {
      backgroundColor: majorVersionIOS > 26 ? 'transparent' : '#1f2937',
    },
    sheetAllowedDetents: [0.7],
  }}
/>
```

## Options disponibles

### `presentation`

Définit le type de présentation du modal.

| Valeur | Description |
|--------|-------------|
| `'card'` | Présentation standard (push) |
| `'modal'` | Modal plein écran |
| `'formSheet'` | Sheet iOS natif (recommandé) |
| `'transparentModal'` | Modal avec fond transparent |

### `sheetGrabberVisible`

Affiche la barre de grip en haut du modal pour indiquer qu'il est glissable.

```typescript
sheetGrabberVisible: true  // Affiche le grabber
sheetGrabberVisible: false // Cache le grabber
```

### `sheetAllowedDetents`

Contrôle la hauteur du modal. Accepte un tableau de valeurs entre 0 et 1 (pourcentage de l'écran).

```typescript
// Hauteur fixe à 70% de l'écran
sheetAllowedDetents: [0.7]

// Plusieurs positions (l'utilisateur peut glisser entre elles)
sheetAllowedDetents: [0.5, 1]  // 50% ou 100%

// S'adapte au contenu
sheetAllowedDetents: 'fitToContents'

// Tailles prédéfinies
sheetAllowedDetents: 'medium'  // ~50%
sheetAllowedDetents: 'large'   // ~100%
```

### `contentStyle`

Style du conteneur du modal.

```typescript
contentStyle: {
  backgroundColor: 'transparent',  // Fond transparent (iOS 16+)
  // ou
  backgroundColor: '#1f2937',      // Couleur de fallback
}
```

**Note:** Le fond transparent fonctionne sur iOS 16+ (`majorVersionIOS > 26`). Pour les versions antérieures, utilisez une couleur de fallback.

### `headerShown`

Affiche ou cache le header de navigation.

```typescript
headerShown: false  // Cache le header
headerShown: true   // Affiche le header
```

## Exemple complet

### Layout (`app/_layout.tsx`)

```typescript
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function RootLayout() {
  const majorVersionIOS = parseInt(String(Platform.Version), 10);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          headerShown: false,
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: majorVersionIOS > 26 ? 'transparent' : '#1f2937',
          },
          sheetAllowedDetents: [0.7],
        }}
      />
    </Stack>
  );
}
```

### Modal (`app/modal.tsx`)

```typescript
import { Text, View } from 'react-native';

export default function Modal() {
  return (
    <View className="flex-1 bg-white items-center justify-center rounded-t-3xl">
      <Text>Contenu du modal</Text>
    </View>
  );
}
```

### Ouvrir le modal

```typescript
import { Link } from 'expo-router';

<Link href="/modal" asChild>
  <Pressable>
    <Text>Ouvrir le modal</Text>
  </Pressable>
</Link>
```

Ou programmatiquement :

```typescript
import { router } from 'expo-router';

router.push('/modal');
```

## Fermer le modal

```typescript
import { router } from 'expo-router';

// Retour arrière
router.back();

// Ou fermer explicitement
router.dismiss();
```

## Valeurs de detents courantes

| Valeur | Hauteur | Usage typique |
|--------|---------|---------------|
| `[0.25]` | 25% | Petit menu rapide |
| `[0.5]` | 50% | Formulaire court |
| `[0.7]` | 70% | Contenu moyen |
| `[1]` | 100% | Plein écran |
| `[0.5, 1]` | 50% → 100% | Extensible par l'utilisateur |
| `'fitToContents'` | Auto | S'adapte au contenu |

## Ressources

- [Expo Router - Modals](https://docs.expo.dev/router/advanced/modals/)
- [React Navigation - Screen options](https://reactnavigation.org/docs/screen-options/)

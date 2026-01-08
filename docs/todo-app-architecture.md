# Todo App Avancée - Architecture & Conception

Documentation pour la construction d'une application de gestion de tâches avancée avec React Native/Expo.

## Table des matières

1. [Analyse de l'interface](#analyse-de-linterface)
2. [Modèle de données](#modèle-de-données)
3. [Composants Agenda Calendar](#composants-agenda-calendar)
4. [Structure du projet](#structure-du-projet)
5. [Dépendances](#dépendances)

---

## Analyse de l'interface

### Structure UI principale

```
┌─────────────────────────────────────┐
│  [Logo]          [Use AI] [Settings]│  ← Header
├─────────────────────────────────────┤
│  🔍 Search tasks                    │  ← Barre de recherche
├─────────────────────────────────────┤
│  [All tasks] [To do] [In Progress]  │  ← Filtres (chips)
│  [Completed] [Cancelled]            │
├─────────────────────────────────────┤
│                                     │
│         📁 Illustration             │  ← Empty state
│      "Nothing here... yet"          │
│   "Every big project starts with    │
│    one small step..."               │
│                                     │
│       [+ Start building]            │  ← CTA Button
│                                     │
└─────────────────────────────────────┘
```

### Composants identifiés

| Composant | Description |
|-----------|-------------|
| Header | Logo + boutons action (AI, Settings) |
| SearchBar | Input de recherche avec icône |
| FilterChips | Chips de filtrage par statut |
| EmptyState | Illustration + texte + CTA |
| TodoList | Liste des tâches (à implémenter) |
| TodoItem | Item individuel d'une tâche |
| FAB | Bouton flottant d'ajout (optionnel) |

### Filtres disponibles

| Filtre | Icône | Statut associé |
|--------|-------|----------------|
| All tasks | Grille (4 carrés) | Tous |
| To do | Cercle vide | `todo` |
| In Progress | Cercle demi-rempli | `in_progress` |
| Completed | Double check | `completed` |
| Cancelled | X dans cercle | `cancelled` |

---

## Modèle de données

### Interface Todo (TypeScript)

```typescript
// types/todo.ts

export type TodoStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  // Identifiant
  id: string;

  // Contenu
  title: string;
  description?: string;

  // Statut & Priorité
  status: TodoStatus;
  priority: TodoPriority;

  // Planning (pour agenda/calendrier)
  date: string;              // Format: YYYY-MM-DD
  dueDate?: string;          // Date limite optionnelle

  // Organisation
  category?: string;         // Ex: "Work", "Personal", "Shopping"
  tags?: string[];           // Tags multiples

  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;

  // IA
  aiGenerated?: boolean;     // Tâche générée par IA
}
```

### Enum pour les statuts

```typescript
// types/enums.ts

export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
```

### Schéma SQL (SQLite / Drizzle / Prisma)

```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo'
    CHECK (status IN ('todo', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high')),
  date TEXT NOT NULL,
  due_date TEXT,
  category TEXT,
  tags TEXT,                    -- JSON array stocké en string
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  ai_generated BOOLEAN DEFAULT FALSE
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_todos_status ON todos(status);
CREATE INDEX idx_todos_date ON todos(date);
CREATE INDEX idx_todos_priority ON todos(priority);
```

---

## Composants Agenda Calendar

Source: [React Native Components - Modern Agenda](https://reactnativecomponents.com/components/calendar/modern-agenda)

### Description

Calendrier agenda moderne avec :
- Calendrier swipeable avec vue mois extensible
- Mode sombre/clair
- Retour haptique (haptic feedback)
- Sélecteur de jours horizontal
- Modal de sélection mois/année
- Gestion de tâches par jour

### Dépendances spécifiques

```bash
npx expo install react-native-calendars expo-haptics
```

### Structure des fichiers agenda

```
components/calendar/
├── CalendarAgenda.tsx      # Composant principal du calendrier
├── MonthPicker.tsx         # Modal sélection mois/année
├── DaySelector.tsx         # Sélecteur horizontal de jours
├── AgendaItem.tsx          # Item todo dans l'agenda
├── theme.ts                # Configuration couleurs/styles
├── date-helpers.ts         # Utilitaires de formatage de dates
└── types.ts                # Interfaces TypeScript
```

### Configuration du thème calendar

```typescript
// components/calendar/theme.ts

export const calendarTheme = {
  // Jour sélectionné
  selectedDayBackgroundColor: '#000000',
  selectedDayTextColor: '#ffffff',

  // Aujourd'hui
  todayTextColor: '#3b82f6',
  todayBackgroundColor: 'transparent',

  // Texte
  textDayFontSize: 17,
  textDayHeaderFontSize: 13,
  textMonthFontSize: 18,
  textMonthFontWeight: 'bold',

  // Couleurs générales
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  dayTextColor: '#1f2937',
  monthTextColor: '#1f2937',

  // Jours désactivés
  textDisabledColor: '#d1d5db',
};
```

### Personnalisation

| Option | Description | Valeur par défaut |
|--------|-------------|-------------------|
| `borderRadius` dans MonthPicker | Forme des jours (22=cercle, 8=arrondi, 0=carré) | 22 |
| `buildDayTimeline()` | Nombre de jours affichés | 30 |
| Données mock | À remplacer par appel API | mock-data.ts |

---

## Structure du projet

### Architecture recommandée

```
expo-i18n/
├── app/                          # Expo Router (pages)
│   ├── _layout.tsx               # Layout racine
│   ├── index.tsx                 # Page d'accueil (liste todos)
│   ├── modal.tsx                 # Modal ajout/édition
│   ├── calendar.tsx              # Vue calendrier/agenda
│   └── settings.tsx              # Paramètres
│
├── components/                   # Composants réutilisables
│   ├── todo/
│   │   ├── TodoItem.tsx          # Item de tâche
│   │   ├── TodoList.tsx          # Liste de tâches
│   │   ├── TodoForm.tsx          # Formulaire ajout/édition
│   │   ├── FilterChips.tsx       # Chips de filtrage
│   │   ├── SearchBar.tsx         # Barre de recherche
│   │   └── EmptyState.tsx        # État vide
│   │
│   ├── calendar/                 # Composants agenda
│   │   ├── CalendarAgenda.tsx
│   │   ├── MonthPicker.tsx
│   │   ├── DaySelector.tsx
│   │   └── AgendaItem.tsx
│   │
│   └── ui/                       # Composants UI génériques
│       ├── Header.tsx
│       ├── Button.tsx
│       └── Input.tsx
│
├── hooks/                        # Custom hooks
│   ├── useTodos.ts               # CRUD todos
│   ├── useSearch.ts              # Logique recherche
│   └── useFilter.ts              # Logique filtrage
│
├── stores/                       # State management (Zustand/Jotai)
│   └── todoStore.ts
│
├── types/                        # TypeScript
│   ├── todo.ts
│   └── enums.ts
│
├── utils/                        # Utilitaires
│   ├── date-helpers.ts
│   └── id-generator.ts
│
├── constants/                    # Constantes
│   ├── colors.ts
│   └── filters.ts
│
├── lang/                         # i18n (existant)
│   ├── index.ts
│   └── locales/
│
└── docs/                         # Documentation
    ├── i18n.md
    ├── modal.md
    └── todo-app-architecture.md  # Ce fichier
```

---

## Dépendances

### Actuellement installées

```json
{
  "expo": "~54.0.31",
  "react-native": "0.81.5",
  "expo-router": "~6.0.21",
  "heroui-native": "1.0.0-beta.11",
  "tailwindcss": "^4.1.18",
  "uniwind": "^1.2.3",
  "i18next": "^25.7.3",
  "react-i18next": "^16.5.1",
  "expo-localization": "^17.0.8",
  "react-native-reanimated": "~4.1.1",
  "react-native-gesture-handler": "~2.28.0"
}
```

### À installer pour l'agenda

```bash
npx expo install react-native-calendars expo-haptics
```

### Optionnel - State management

```bash
# Zustand (recommandé pour sa simplicité)
pnpm add zustand

# Ou Jotai (atoms)
pnpm add jotai
```

### Optionnel - Base de données locale

```bash
# SQLite avec Drizzle
pnpm add drizzle-orm expo-sqlite
pnpm add -D drizzle-kit

# Ou MMKV pour stockage simple
npx expo install react-native-mmkv
```

---

## Prochaines étapes

1. [ ] Créer les types (`types/todo.ts`)
2. [ ] Créer le store Zustand (`stores/todoStore.ts`)
3. [ ] Créer les composants Todo (TodoItem, TodoList, FilterChips)
4. [ ] Implémenter la page d'accueil avec la liste
5. [ ] Créer le formulaire d'ajout dans le modal
6. [ ] Ajouter la barre de recherche
7. [ ] Intégrer le calendrier agenda
8. [ ] Ajouter la persistance (SQLite ou MMKV)
9. [ ] Implémenter la fonctionnalité "Use AI"

---

## Ressources

- [Expo Router - Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Calendars](https://github.com/wix/react-native-calendars)
- [Zustand](https://github.com/pmndrs/zustand)
- [HeroUI Native](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

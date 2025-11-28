# Exemples de manipulation des catégories d'aliments

Ce dossier contient des exemples de code pour manipuler les catégories d'aliments dans votre application.

## Fonctionnalités disponibles

### 1. Actions serveur (`app/actions/getCategories.ts`)

#### `getCategories()`
Récupère toutes les catégories uniques depuis la base de données.

```typescript
import { getCategories } from "@/app/actions/getCategories";

const categories = await getCategories();
// Retourne: ["Fruits", "Légumes", "Viandes", ...]
```

#### `getCategoriesWithCount()`
Récupère le nombre d'aliments par catégorie.

```typescript
import { getCategoriesWithCount } from "@/app/actions/getCategories";

const counts = await getCategoriesWithCount();
// Retourne: { "Fruits": 5, "Légumes": 8, "Viandes": 3 }
```

### 2. Composants de filtrage (`app/components/Course/CategoryFilter.tsx`)

Composant pour filtrer les aliments par catégorie avec sélection multiple.

```typescript
import { CategoryFilter } from "@/app/components/Course/CategoryFilter";

<CategoryFilter
  courses={allCourses}
  selectedCategories={selectedCategories}
  onCategoriesChange={setSelectedCategories}
/>
```

### 3. Composant de groupement (`app/components/Course/CategoryGroup.tsx`)

Composant qui groupe et affiche les aliments par catégorie.

```typescript
import { CategoryGroup } from "@/app/components/Course/CategoryGroup";

<CategoryGroup
  courses={sortedCourses}
  checkedMap={checkedMap}
  isPending={isPending}
  onToggle={handleToggle}
/>
```

## Page d'exemple

Visitez `/examples-categories` pour voir toutes ces fonctionnalités en action :
- Statistiques par catégorie
- Filtrage par catégorie
- Groupement par catégorie
- Tri des aliments

## Utilisation dans votre code

### Filtrer les courses par catégorie

```typescript
const filteredCourses = allCourses.filter((course) => 
  course.categorie && selectedCategories.includes(course.categorie)
);
```

### Grouper les courses par catégorie

```typescript
const groupedByCategory: Record<string, CourseItem[]> = {};

courses.forEach((course) => {
  if (course.categorie) {
    if (!groupedByCategory[course.categorie]) {
      groupedByCategory[course.categorie] = [];
    }
    groupedByCategory[course.categorie].push(course);
  }
});
```

### Obtenir toutes les catégories uniques

```typescript
const categories = new Set<string>();
courses.forEach((course) => {
  if (course.categorie) {
    categories.add(course.categorie);
  }
});
const uniqueCategories = Array.from(categories).sort();
```


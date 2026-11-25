import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Recipe } from './types';

type ApiResponse = { recipes?: unknown };

type HomeContextValue = {
  recipes: Recipe[];
  loading: boolean;
  loadError: string;
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  visibleRecipes: Recipe[];
  cart: Record<number, number>;
  cartEntries: Recipe[];
  cartCount: number;
  setSearchQuery: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  changeCartCount: (recipeId: number, amount: number) => void;
  addToCart: (recipe: Recipe) => void;
  loadRecipes: () => Promise<void>;
};

const HomeContext = createContext<HomeContextValue | null>(null);

function isRecipe(value: unknown): value is Recipe {
  if (!value || typeof value !== 'object') return false;
  const recipe = value as Record<string, unknown>;
  return typeof recipe.id === 'number'
    && typeof recipe.name === 'string'
    && Array.isArray(recipe.ingredients)
    && Array.isArray(recipe.instructions)
    && typeof recipe.image === 'string'
    && typeof recipe.cuisine === 'string'
    && Array.isArray(recipe.tags)
    && Array.isArray(recipe.mealType)
    && typeof recipe.prepTimeMinutes === 'number'
    && typeof recipe.cookTimeMinutes === 'number'
    && typeof recipe.servings === 'number'
    && typeof recipe.difficulty === 'string'
    && typeof recipe.caloriesPerServing === 'number'
    && typeof recipe.rating === 'number'
    && typeof recipe.reviewCount === 'number';
}

export function HomeProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [cart, setCart] = useState<Record<number, number>>({});

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('https://dummyjson.com/recipes?limit=50', {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
      const data = await response.json() as ApiResponse;
      if (!Array.isArray(data.recipes)) throw new Error('API жауабында recipes тізімі жоқ.');
      const validRecipes = data.recipes.filter(isRecipe);
      if (validRecipes.length === 0) throw new Error('API recipes пішімі жарамсыз.');
      setRecipes(validRecipes);
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      setLoadError(controller.signal.aborted
        ? 'Сұрау 15 секундтан кейін тоқтатылды. Құрылғының интернетін тексеріңіз.'
        : `Серверге қосылу қатесі: ${details || 'белгісіз қате'}.`);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecipes();
  }, [loadRecipes]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)))],
    [recipes],
  );
  const visibleRecipes = useMemo(() => recipes.filter((recipe) => {
    const matchesSearch = `${recipe.name} ${recipe.cuisine} ${recipe.tags.join(' ')} ${recipe.mealType.join(' ')}`
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  }), [recipes, searchQuery, selectedCategory]);
  const cartEntries = recipes.filter((recipe) => (cart[recipe.id] ?? 0) > 0);
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0);

  const changeCartCount = (recipeId: number, amount: number) => {
    setCart((current) => {
      const nextCount = (current[recipeId] ?? 0) + amount;
      const next = { ...current };
      if (nextCount <= 0) delete next[recipeId];
      else next[recipeId] = nextCount;
      return next;
    });
  };

  const addToCart = (recipe: Recipe) => {
    changeCartCount(recipe.id, 1);
  };

  return (
    <HomeContext.Provider value={{
      recipes, loading, loadError, searchQuery, selectedCategory, categories,
      visibleRecipes, cart, cartEntries, cartCount, setSearchQuery,
      setSelectedCategory, changeCartCount, addToCart, loadRecipes,
    }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const value = useContext(HomeContext);
  if (!value) throw new Error('useHome must be used inside HomeProvider');
  return value;
}

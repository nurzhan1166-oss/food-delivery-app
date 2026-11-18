import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, ScrollView, StatusBar, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { colors } from '../theme';

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

type Tab = 'Home' | 'Search' | 'Cart' | 'Profile';
type ApiResponse = { recipes?: unknown };

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

const categoryIcons: Record<string, string> = {
  All: '🍽️',
  Pizza: '🍕',
  Italian: '🇮🇹',
  Vegetarian: '🥗',
  Dessert: '🍰',
  Asian: '🥢',
  American: '🍔',
  Breakfast: '🍳',
};

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
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
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
      }
      const data = await response.json() as ApiResponse;
      if (!Array.isArray(data.recipes)) {
        throw new Error('API жауабында recipes тізімі жоқ.');
      }
      const validRecipes = data.recipes.filter(isRecipe);
      if (validRecipes.length === 0) {
        throw new Error('API рецептер жіберді, бірақ олардың пішімі жарамсыз.');
      }
      setRecipes(validRecipes);
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      setLoadError(
        controller.signal.aborted
          ? 'Сұрау 15 секундтан кейін тоқтатылды. Құрылғының интернетін тексеріңіз.'
          : `Серверге қосылу қатесі: ${details || 'белгісіз қате'}.`,
      );
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

  const addToCart = (recipe: Recipe) => {
    setCart((current) => ({ ...current, [recipe.id]: (current[recipe.id] ?? 0) + 1 }));
    setSelectedRecipe(null);
    setActiveTab('Cart');
  };

  const changeCartCount = (recipeId: number, amount: number) => {
    setCart((current) => {
      const nextCount = (current[recipeId] ?? 0) + amount;
      const next = { ...current };
      if (nextCount <= 0) delete next[recipeId];
      else next[recipeId] = nextCount;
      return next;
    });
  };

  const showRecipes = (items: Recipe[]) => items.map((recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={s.card}
      onPress={() => setSelectedRecipe(recipe)}
      accessibilityRole="button"
      accessibilityLabel={`View ${recipe.name}`}
    >
      <Image source={{ uri: recipe.image }} style={s.recipeImage} />
      <View style={s.cardInfo}>
        <Text style={s.restaurantName}>{recipe.name}</Text>
        <Text style={s.restaurantType}>{recipe.cuisine} · {recipe.mealType.join(', ')}</Text>
        <Text style={s.rating}>⭐ {recipe.rating} ({recipe.reviewCount} reviews) · {recipe.cookTimeMinutes} min</Text>
      </View>
    </TouchableOpacity>
  ));

  const showLoadState = () => {
    if (loading) {
      return <View style={s.messageState}><ActivityIndicator color={colors.orange} /><Text style={s.emptyText}>Рецепттер серверден жүктелуде...</Text></View>;
    }
    if (loadError) {
      return (
        <View style={s.messageState}>
          <Text style={s.errorTitle}>API қатесі</Text>
          <Text style={s.emptyText}>{loadError}</Text>
          <TouchableOpacity style={s.primaryButton} onPress={() => void loadRecipes()} accessibilityRole="button">
            <Text style={s.primaryButtonText}>Қайта жүктеу</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={s.messageState}>
        <Text style={s.loadedText}>API-ден {recipes.length} рецепт жүктелді</Text>
      </View>
    );
  };

  const showEmptyResults = () => (
    <Text style={s.emptyText}>No recipes found. Try a different search or category.</Text>
  );

  const openProfile = () => setActiveTab('Profile');

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        {selectedRecipe ? (
          <View>
            <TouchableOpacity style={s.backButton} onPress={() => setSelectedRecipe(null)}>
              <Text style={s.backButtonText}>‹  Back to recipes</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedRecipe.image }} style={s.detailImage} />
            <Text style={s.pageTitle}>{selectedRecipe.name}</Text>
            <Text style={s.detailMeta}>
              ⭐ {selectedRecipe.rating} ({selectedRecipe.reviewCount} reviews) · {selectedRecipe.cuisine}
            </Text>
            <Text style={s.detailMeta}>
              Prep {selectedRecipe.prepTimeMinutes} min · Cook {selectedRecipe.cookTimeMinutes} min · {selectedRecipe.caloriesPerServing} cal/serving
            </Text>
            <Text style={s.sectionTitleDetail}>Ingredients · {selectedRecipe.servings} servings</Text>
            {selectedRecipe.ingredients.map((ingredient) => (
              <Text key={ingredient} style={s.listItem}>•  {ingredient}</Text>
            ))}
            <Text style={s.sectionTitleDetail}>Instructions</Text>
            {selectedRecipe.instructions.map((instruction, index) => (
              <Text key={`${index}-${instruction}`} style={s.listItem}>{index + 1}.  {instruction}</Text>
            ))}
            <TouchableOpacity style={s.primaryButton} onPress={() => addToCart(selectedRecipe)}>
              <Text style={s.primaryButtonText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {activeTab === 'Home' && (
              <>
                <View style={s.header}>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Delivery location', 'Almaty, Kazakhstan')}
                    accessibilityRole="button"
                  >
                    <Text style={s.delivery}>DELIVER TO</Text>
                    <Text style={s.location}>Almaty, Kazakhstan⌄</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openProfile} accessibilityRole="button" accessibilityLabel="Open profile">
                    <Text style={s.avatar}>👤</Text>
                  </TouchableOpacity>
                </View>

                <Text style={s.greeting}>Hey! Good Afternoon!</Text>
                <Text style={s.subtitle}>What would you like to eat today?</Text>
                <TextInput
                  style={s.search}
                  placeholder="⌕  Search recipes"
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  accessibilityLabel="Search recipes"
                />

                <View style={s.sectionHeader}>
                  <Text style={s.sectionTitle}>Categories</Text>
                  <TouchableOpacity onPress={() => setSelectedCategory('All')} accessibilityRole="button">
                    <Text style={s.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[s.category, selectedCategory === category && s.activeCategory]}
                      onPress={() => setSelectedCategory(category)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: selectedCategory === category }}
                    >
                      <Text style={[s.categoryText, selectedCategory === category && s.activeText]}>
                        {categoryIcons[category] ?? '🍴'} {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <View style={s.sectionHeader}>
                  <Text style={s.sectionTitle}>Popular recipes</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setActiveTab('Search');
                    }}
                    accessibilityRole="button"
                  >
                    <Text style={s.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
                {showLoadState()}
                {!loading && !loadError && (visibleRecipes.length ? showRecipes(visibleRecipes) : showEmptyResults())}
              </>
            )}

            {activeTab === 'Search' && (
              <>
                <Text style={s.pageTitle}>Search recipes</Text>
                <TextInput
                  style={s.search}
                  placeholder="⌕  Search by name, cuisine, or tag"
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  accessibilityLabel="Search recipes"
                />
                {showLoadState()}
                {!loading && !loadError && (visibleRecipes.length ? showRecipes(visibleRecipes) : showEmptyResults())}
              </>
            )}

            {activeTab === 'Cart' && (
              <>
                <Text style={s.pageTitle}>Your cart</Text>
                {cartEntries.length === 0 ? (
                  <View style={s.emptyPage}>
                    <Text style={s.emptyIcon}>🛒</Text>
                    <Text style={s.emptyText}>Your cart is empty. Choose a recipe and add it to your cart.</Text>
                    <TouchableOpacity style={s.primaryButton} onPress={() => setActiveTab('Home')}>
                      <Text style={s.primaryButtonText}>Browse recipes</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    {cartEntries.map((recipe) => (
                      <View key={recipe.id} style={s.cartRow}>
                        <Image source={{ uri: recipe.image }} style={s.cartImage} />
                        <View style={s.cartInfo}>
                          <Text style={s.restaurantName}>{recipe.name}</Text>
                          <Text style={s.restaurantType}>{recipe.cuisine}</Text>
                        </View>
                        <TouchableOpacity style={s.quantityButton} onPress={() => changeCartCount(recipe.id, -1)} accessibilityLabel={`Remove one ${recipe.name}`}>
                          <Text style={s.quantityText}>−</Text>
                        </TouchableOpacity>
                        <Text style={s.quantity}>{cart[recipe.id]}</Text>
                        <TouchableOpacity style={s.quantityButton} onPress={() => changeCartCount(recipe.id, 1)} accessibilityLabel={`Add one ${recipe.name}`}>
                          <Text style={s.quantityText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={s.primaryButton}
                      onPress={() => Alert.alert('Order confirmed', `Your order includes ${cartCount} recipe item${cartCount === 1 ? '' : 's'}.`)}
                    >
                      <Text style={s.primaryButtonText}>Place order · {cartCount} item{cartCount === 1 ? '' : 's'}</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}

            {activeTab === 'Profile' && (
              <>
                <Text style={s.pageTitle}>Profile</Text>
                <View style={s.profileCard}>
                  <Text style={s.profileAvatar}>👤</Text>
                  <View>
                    <Text style={s.restaurantName}>Welcome!</Text>
                    <Text style={s.restaurantType}>Manage your account</Text>
                  </View>
                </View>
                {[
                  ['Personal information', 'No personal information has been added yet.'],
                  ['Delivery addresses', 'Almaty, Kazakhstan'],
                  ['Payment methods', 'No payment methods have been added yet.'],
                  ['Settings', 'Settings are up to date.'],
                ].map(([label, message]) => (
                  <TouchableOpacity
                    key={label}
                    style={s.profileRow}
                    onPress={() => Alert.alert(label, message)}
                    accessibilityRole="button"
                  >
                    <Text style={s.profileRowText}>{label}</Text>
                    <Text style={s.profileChevron}>›</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      {!selectedRecipe && (
        <View style={s.bottomBar}>
          {([
            ['Home', '🏠'],
            ['Search', '🔍'],
            ['Cart', '🛒'],
            ['Profile', '👤'],
          ] as const).map(([tab, icon]) => (
            <TouchableOpacity
              key={tab}
              style={s.bottomTab}
              onPress={() => setActiveTab(tab)}
              accessibilityRole="button"
              accessibilityState={{ selected: activeTab === tab }}
              accessibilityLabel={tab === 'Cart' ? `Cart, ${cartCount} items` : tab}
            >
              <Text style={[s.bottomItem, activeTab === tab && s.activeBottomItem]}>
                {icon} {tab}{tab === 'Cart' && cartCount > 0 ? ` (${cartCount})` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 45 },
  content: { flexGrow: 1, paddingBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22 },
  delivery: { color: colors.orange, fontSize: 10, fontWeight: 'bold' },
  location: { color: colors.dark, fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  avatar: { fontSize: 27, backgroundColor: '#F2F2F2', padding: 10, borderRadius: 30 },
  greeting: { fontSize: 22, color: colors.dark, fontWeight: 'bold', marginTop: 30, marginHorizontal: 22 },
  subtitle: { color: '#999', marginHorizontal: 22, marginTop: 6, fontSize: 12 },
  search: { backgroundColor: '#F4F5F8', height: 52, borderRadius: 10, margin: 22, paddingHorizontal: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 22, marginBottom: 15, marginTop: 12 },
  sectionTitle: { color: colors.dark, fontSize: 17, fontWeight: 'bold' },
  seeAll: { color: colors.orange, fontSize: 12 },
  category: { backgroundColor: '#F4F4F6', padding: 13, borderRadius: 22, marginLeft: 12 },
  activeCategory: { backgroundColor: colors.orange },
  categoryText: { color: colors.dark, fontSize: 12 },
  activeText: { color: colors.white },
  card: { marginHorizontal: 22, marginBottom: 18, borderRadius: 13, overflow: 'hidden', backgroundColor: '#F7F7F8' },
  recipeImage: { height: 170, width: '100%', backgroundColor: '#FFF0E5' },
  cardInfo: { padding: 13 },
  restaurantName: { fontSize: 15, color: colors.dark, fontWeight: 'bold' },
  restaurantType: { fontSize: 11, color: '#999', marginTop: 6 },
  rating: { fontSize: 10, color: '#777', marginTop: 9 },
  bottomBar: { height: 62, borderTopWidth: 1, borderColor: '#EEE', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: colors.white },
  bottomTab: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  bottomItem: { fontSize: 11, color: colors.dark },
  activeBottomItem: { color: colors.orange, fontWeight: 'bold' },
  pageTitle: { fontSize: 24, color: colors.dark, fontWeight: 'bold', marginHorizontal: 22, marginTop: 20 },
  emptyPage: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingTop: 40 },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  emptyText: { color: '#999', fontSize: 13, textAlign: 'center', marginHorizontal: 22, marginTop: 12, lineHeight: 20 },
  messageState: { alignItems: 'center', paddingVertical: 36 },
  errorTitle: { color: '#B42318', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  loadedText: { color: '#667085', fontSize: 12, marginTop: 6 },
  primaryButton: { backgroundColor: colors.orange, borderRadius: 10, paddingHorizontal: 22, paddingVertical: 14, marginTop: 22, marginHorizontal: 22, alignItems: 'center' },
  primaryButtonText: { color: colors.white, fontSize: 14, fontWeight: 'bold' },
  backButton: { paddingHorizontal: 22, paddingVertical: 12 },
  backButtonText: { color: colors.orange, fontSize: 15, fontWeight: 'bold' },
  detailImage: { width: '100%', height: 240, backgroundColor: '#FFF0E5' },
  detailMeta: { color: '#777', fontSize: 12, marginHorizontal: 22, marginTop: 8 },
  sectionTitleDetail: { color: colors.dark, fontSize: 17, fontWeight: 'bold', marginHorizontal: 22, marginTop: 24, marginBottom: 10 },
  listItem: { color: colors.dark, fontSize: 13, lineHeight: 20, marginHorizontal: 22, marginBottom: 8 },
  cartRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 22, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  cartImage: { width: 58, height: 58, borderRadius: 10, backgroundColor: '#FFF0E5' },
  cartInfo: { flex: 1, marginHorizontal: 12 },
  quantityButton: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#F4F4F6' },
  quantityText: { color: colors.dark, fontSize: 18 },
  quantity: { color: colors.dark, fontSize: 14, fontWeight: 'bold', marginHorizontal: 10 },
  profileCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 22, marginTop: 24, marginBottom: 16, padding: 18, borderRadius: 13, backgroundColor: '#F7F7F8' },
  profileAvatar: { fontSize: 30, backgroundColor: '#FFF0E5', padding: 12, borderRadius: 30, marginRight: 14 },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 22, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  profileRowText: { color: colors.dark, fontSize: 14 },
  profileChevron: { color: '#999', fontSize: 22 },
});

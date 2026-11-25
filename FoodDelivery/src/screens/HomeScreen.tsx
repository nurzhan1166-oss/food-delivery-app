import React from 'react';
import { Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation';
import BottomBar from './home/BottomBar';
import { useHome } from './home/HomeContext';
import { homeStyles as s } from './home/homeStyles';
import LoadState from './home/LoadState';
import RecipeCard from './home/RecipeCard';

const categoryIcons: Record<string, string> = {
  All: '🍽️', Pizza: '🍕', Italian: '🇮🇹', Vegetarian: '🥗', Dessert: '🍰',
  Asian: '🥢', American: '🍔', Breakfast: '🍳',
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const home = useHome();

  const openSearch = () => {
    home.setSearchQuery('');
    home.setSelectedCategory('All');
    navigation.navigate('Search');
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => Alert.alert('Delivery location', 'Almaty, Kazakhstan')} accessibilityRole="button">
            <Text style={s.delivery}>DELIVER TO</Text>
            <Text style={s.location}>Almaty, Kazakhstan⌄</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} accessibilityRole="button" accessibilityLabel="Open profile">
            <Text style={s.avatar}>👤</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.greeting}>Hey! Good Afternoon!</Text>
        <Text style={s.subtitle}>What would you like to eat today?</Text>
        <TextInput
          style={s.search}
          placeholder="⌕  Search recipes"
          placeholderTextColor="#999"
          value={home.searchQuery}
          onChangeText={home.setSearchQuery}
          accessibilityLabel="Search recipes"
        />

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => home.setSelectedCategory('All')} accessibilityRole="button">
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {home.categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[s.category, home.selectedCategory === category && s.activeCategory]}
              onPress={() => home.setSelectedCategory(category)}
              accessibilityRole="button"
              accessibilityState={{ selected: home.selectedCategory === category }}
            >
              <Text style={[s.categoryText, home.selectedCategory === category && s.activeText]}>
                {categoryIcons[category] ?? '🍴'} {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Popular recipes</Text>
          <TouchableOpacity onPress={openSearch} accessibilityRole="button">
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <LoadState
          loading={home.loading}
          loadError={home.loadError}
          recipesCount={home.recipes.length}
          onRetry={() => void home.loadRecipes()}
        />
        {!home.loading && !home.loadError && (
          home.visibleRecipes.length
            ? home.visibleRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onPress={(item) => navigation.navigate('RecipeDetail', { recipe: item })}
                />
              ))
            : <Text style={s.emptyText}>No recipes found. Try a different search or category.</Text>
        )}
      </ScrollView>
      <BottomBar activeRoute="Home" navigation={navigation} />
    </View>
  );
}

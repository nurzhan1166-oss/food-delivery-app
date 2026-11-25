import React from 'react';
import { ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation';
import BottomBar from './home/BottomBar';
import { useHome } from './home/HomeContext';
import { homeStyles as s } from './home/homeStyles';
import LoadState from './home/LoadState';
import RecipeCard from './home/RecipeCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: Props) {
  const home = useHome();

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <Text style={s.pageTitle}>Search recipes</Text>
        <TextInput
          style={s.search}
          placeholder="⌕  Search by name, cuisine, or tag"
          placeholderTextColor="#999"
          value={home.searchQuery}
          onChangeText={home.setSearchQuery}
          accessibilityLabel="Search recipes"
        />
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
      <BottomBar activeRoute="Search" navigation={navigation} />
    </View>
  );
}

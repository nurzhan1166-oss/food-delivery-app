import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation';
import { useHome } from './home/HomeContext';
import { homeStyles as s } from './home/homeStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

export default function RecipeDetailScreen({ route, navigation }: Props) {
  const home = useHome();
  const recipe = route.params.recipe;

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <TouchableOpacity style={s.backButton} onPress={() => navigation.goBack()}>
          <Text style={s.backButtonText}>‹  Back to recipes</Text>
        </TouchableOpacity>
        <Image source={{ uri: recipe.image }} style={s.detailImage} />
        <Text style={s.pageTitle}>{recipe.name}</Text>
        <Text style={s.detailMeta}>⭐ {recipe.rating} ({recipe.reviewCount} reviews) · {recipe.cuisine}</Text>
        <Text style={s.detailMeta}>
          Prep {recipe.prepTimeMinutes} min · Cook {recipe.cookTimeMinutes} min · {recipe.caloriesPerServing} cal/serving
        </Text>
        <Text style={s.sectionTitleDetail}>Ingredients · {recipe.servings} servings</Text>
        {recipe.ingredients.map((ingredient) => (
          <Text key={ingredient} style={s.listItem}>•  {ingredient}</Text>
        ))}
        <Text style={s.sectionTitleDetail}>Instructions</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={`${index}-${instruction}`} style={s.listItem}>{index + 1}.  {instruction}</Text>
        ))}
        <TouchableOpacity
          style={s.primaryButton}
          onPress={() => {
            home.addToCart(recipe);
            navigation.navigate('Cart');
          }}
        >
          <Text style={s.primaryButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

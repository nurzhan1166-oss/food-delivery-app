import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles as s } from './homeStyles';
import type { Recipe } from './types';

type Props = {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
};

export default function RecipeCard({ recipe, onPress }: Props) {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => onPress(recipe)}
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
  );
}

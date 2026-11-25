import React from 'react';
import { Alert, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation';
import BottomBar from './home/BottomBar';
import { useHome } from './home/HomeContext';
import { homeStyles as s } from './home/homeStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const home = useHome();

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <Text style={s.pageTitle}>Your cart</Text>
        {home.cartEntries.length === 0 ? (
          <View style={s.emptyPage}>
            <Text style={s.emptyIcon}>🛒</Text>
            <Text style={s.emptyText}>Your cart is empty. Choose a recipe and add it to your cart.</Text>
            <TouchableOpacity style={s.primaryButton} onPress={() => navigation.navigate('Home')}>
              <Text style={s.primaryButtonText}>Browse recipes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {home.cartEntries.map((recipe) => (
              <View key={recipe.id} style={s.cartRow}>
                <Image source={{ uri: recipe.image }} style={s.cartImage} />
                <View style={s.cartInfo}>
                  <Text style={s.restaurantName}>{recipe.name}</Text>
                  <Text style={s.restaurantType}>{recipe.cuisine}</Text>
                </View>
                <TouchableOpacity
                  style={s.quantityButton}
                  onPress={() => home.changeCartCount(recipe.id, -1)}
                  accessibilityLabel={`Remove one ${recipe.name}`}
                >
                  <Text style={s.quantityText}>−</Text>
                </TouchableOpacity>
                <Text style={s.quantity}>{home.cart[recipe.id]}</Text>
                <TouchableOpacity
                  style={s.quantityButton}
                  onPress={() => home.changeCartCount(recipe.id, 1)}
                  accessibilityLabel={`Add one ${recipe.name}`}
                >
                  <Text style={s.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={s.primaryButton}
              onPress={() => Alert.alert(
                'Order confirmed',
                `Your order includes ${home.cartCount} recipe item${home.cartCount === 1 ? '' : 's'}.`,
              )}
            >
              <Text style={s.primaryButtonText}>
                Place order · {home.cartCount} item{home.cartCount === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <BottomBar activeRoute="Cart" navigation={navigation} />
    </View>
  );
}

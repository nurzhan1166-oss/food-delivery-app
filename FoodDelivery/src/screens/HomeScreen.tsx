
import React from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet, StatusBar
} from 'react-native';
import { colors } from '../theme';

const restaurants = [
  { name: 'Rose Garden Restaurant', type: 'Burger • Chicken • Wings', rating: '4.7', image: '🍔' },
  { name: 'Pizza House', type: 'Pizza • Italian food', rating: '4.8', image: '🍕' },
  { name: 'Fresh Food Cafe', type: 'Healthy • Salads', rating: '4.6', image: '🥗' },
];

export default function HomeScreen() {
  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View>
            <Text style={s.delivery}>DELIVER TO</Text>
            <Text style={s.location}>Almaty, Kazakhstan⌄</Text>
          </View>
          <Text style={s.avatar}>👤</Text>
        </View>

        <Text style={s.greeting}>Hey! Good Afternoon!</Text>
        <Text style={s.subtitle}>What would you like to eat today?</Text>

        <TextInput
          style={s.search}
          placeholder="⌕  Search dishes, restaurants"
          placeholderTextColor="#999"
        />

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>All Categories</Text>
          <Text style={s.seeAll}>See All</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['🍽️ All', '🌭 Hot Dog', '🍔 Burger', '🍕 Pizza', '🥗 Salad'].map((item, index) => (
            <TouchableOpacity key={item} style={[s.category, index === 0 && s.activeCategory]}>
              <Text style={[s.categoryText, index === 0 && s.activeText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Open Restaurants</Text>
          <Text style={s.seeAll}>See All</Text>
        </View>

        {restaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.name} style={s.card}>
            <View style={s.foodImage}>
              <Text style={s.foodEmoji}>{restaurant.image}</Text>
            </View>
            <View style={s.cardInfo}>
              <Text style={s.restaurantName}>{restaurant.name}</Text>
              <Text style={s.restaurantType}>{restaurant.type}</Text>
              <Text style={s.rating}>⭐ {restaurant.rating}   •   Free delivery   •   20 min</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={s.bottomBar}>
        <Text style={s.bottomItem}>🏠 Home</Text>
        <Text style={s.bottomItem}>🔍 Search</Text>
        <Text style={s.bottomItem}>🛒 Cart</Text>
        <Text style={s.bottomItem}>👤 Profile</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 45 },
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
  foodImage: { height: 130, backgroundColor: '#FFF0E5', alignItems: 'center', justifyContent: 'center' },
  foodEmoji: { fontSize: 75 },
  cardInfo: { padding: 13 },
  restaurantName: { fontSize: 15, color: colors.dark, fontWeight: 'bold' },
  restaurantType: { fontSize: 11, color: '#999', marginTop: 6 },
  rating: { fontSize: 10, color: '#777', marginTop: 9 },
  bottomBar: { height: 62, borderTopWidth: 1, borderColor: '#EEE', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: colors.white },
  bottomItem: { fontSize: 11, color: colors.dark },
});

import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Санаттар тізімі
const categories = ['All', 'Hot Dog', 'Burger', 'Pizza'];

// Ресторандар тізімі (суреттер орнына түсті блоктар)
const restaurants = [
  { id: '1', name: 'Rose Garden Restaurant', info: 'Burger - Chicken - Wings', rating: '4.7', delivery: 'Free', time: '20 min', color: '#98A8B8' },
  { id: '2', name: 'Spicy Restaurant', info: 'Burger - Pizza - Fast Food', rating: '4.5', delivery: 'Free', time: '25 min', color: '#E0A96D' },
  { id: '3', name: 'Tasty Treat Gallery', info: 'Pizza - Pasta - Salad', rating: '4.3', delivery: 'Free', time: '30 min', color: '#8FB996' },
];

export default function HomeScreen() {
  // Таңдалған санат
  const [selected, setSelected] = useState('All');

  // Экран ашылғанда геолокация сұрайтын терезе шығады
  useEffect(() => {
    Alert.alert(
      'Allow "Food" to access your location?',
      'Food will access your location only while using the app',
      [{ text: "Don't Allow", style: 'cancel' }, { text: 'Allow' }]
    );
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Жоғарғы жол: мекенжай */}
      <Text style={styles.deliver}>DELIVER TO</Text>
      <Text style={styles.address}>Halal Lab office ▾</Text>

      <Text style={styles.hello}>
        Hey Halal, <Text style={styles.bold}>Good Afternoon!</Text>
      </Text>

      {/* Іздеу өрісі */}
      <TextInput
        style={styles.search}
        placeholder="Search dishes, restaurants"
        placeholderTextColor={colors.gray}
      />

      {/* Санаттар */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>All Categories</Text>
        <Text style={styles.seeAll}>See All ›</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, selected === item && styles.chipActive]}
            onPress={() => setSelected(item)}
          >
            <Text style={[styles.chipText, selected === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ашық рестораңдар */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Open Restaurants</Text>
        <Text style={styles.seeAll}>See All ›</Text>
      </View>

      {restaurants.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={[styles.image, { backgroundColor: item.color }]} />
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardInfo}>{item.info}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>⭐ {item.rating}</Text>
            <Text style={styles.metaText}>🚚 {item.delivery}</Text>
            <Text style={styles.metaText}>🕒 {item.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 24, paddingTop: 60 },
  deliver: { fontSize: 12, fontWeight: '700', color: colors.orange },
  address: { marginTop: 4, fontSize: 14, color: colors.gray },
  hello: { marginTop: 20, fontSize: 16, color: colors.text },
  bold: { fontWeight: '700' },
  search: {
    height: 52,
    marginTop: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.light,
    fontSize: 14,
    color: colors.text,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, color: colors.text },
  seeAll: { fontSize: 14, color: colors.gray },
  categories: { flexGrow: 0 },
  chip: {
    paddingHorizontal: 20,
    height: 46,
    marginRight: 12,
    borderRadius: 23,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.orange, borderColor: colors.orange },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.text },
  chipTextActive: { color: colors.white },
  card: { marginBottom: 20 },
  image: { height: 140, borderRadius: 16 },
  cardTitle: { marginTop: 10, fontSize: 18, color: colors.text },
  cardInfo: { marginTop: 4, fontSize: 13, color: colors.gray },
  meta: { flexDirection: 'row', gap: 20, marginTop: 8 },
  metaText: { fontSize: 13, color: colors.text },
});
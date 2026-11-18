
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Location'>;

export default function LocationScreen({ navigation }: Props) {
  const continueApp = () => {
    Alert.alert(
      'Location',
      'Location access can be connected later. Continuing to Home.'
    );
    navigation.replace('Home');
  };

  return (
    <View style={s.container}>
      <View style={s.illustration}>
        <Text style={s.map}>🗺️</Text>
        <Text style={s.pin}>📍</Text>
      </View>

      <Text style={s.title}>Find Your Location</Text>
      <Text style={s.description}>
        DFood will access your location only while using the app.
      </Text>

      <TouchableOpacity style={s.button} onPress={continueApp}>
        <Text style={s.buttonText}>ACCESS LOCATION  📍</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <Text style={s.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', padding: 30 },
  illustration: { width: 230, height: 230, backgroundColor: '#FFF5EA', borderRadius: 115, alignItems: 'center', justifyContent: 'center' },
  map: { fontSize: 130 },
  pin: { fontSize: 55, position: 'absolute', top: 65 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.dark, marginTop: 45 },
  description: { color: '#999', fontSize: 12, textAlign: 'center', marginTop: 15, lineHeight: 20 },
  button: { width: '100%', height: 55, backgroundColor: colors.orange, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 45 },
  buttonText: { color: colors.white, fontWeight: 'bold', fontSize: 13 },
  skip: { color: '#999', marginTop: 20 },
});

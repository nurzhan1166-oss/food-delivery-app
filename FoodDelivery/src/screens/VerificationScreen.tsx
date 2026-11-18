
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

export default function VerificationScreen({ navigation }: Props) {
  const [code, setCode] = useState('');

  const verify = () => {
    if (code.length !== 4) {
      Alert.alert('Ошибка', 'Введите 4 цифры');
      return;
    }
    navigation.replace('Location');
  };

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={s.back}>‹</Text>
      </TouchableOpacity>

      <Text style={s.title}>Verification</Text>
      <Text style={s.subtitle}>
        We have sent a code to your email
      </Text>

      <View style={s.form}>
        <Text style={s.label}>CODE</Text>
        <TextInput
          style={s.code}
          value={code}
          onChangeText={value => setCode(value.replace(/[^0-9]/g, '').slice(0, 4))}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="----"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={s.button} onPress={verify}>
          <Text style={s.buttonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 55 },
  back: {
    color: colors.background, backgroundColor: colors.white,
    width: 40, height: 40, borderRadius: 20,
    textAlign: 'center', textAlignVertical: 'center',
    fontSize: 28, marginLeft: 22,
  },
  title: { color: colors.white, fontSize: 29, fontWeight: 'bold', textAlign: 'center', marginTop: 35 },
  subtitle: { color: '#C5C3D0', textAlign: 'center', marginTop: 12 },
  form: {
    flex: 1, backgroundColor: colors.white,
    borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, marginTop: 45,
  },
  label: { color: '#555', fontWeight: 'bold', fontSize: 12, marginTop: 20 },
  code: {
    backgroundColor: colors.lightGray, height: 65,
    borderRadius: 10, marginTop: 15, textAlign: 'center',
    fontSize: 25, letterSpacing: 15, color: colors.text,
  },
  button: { backgroundColor: colors.orange, height: 52, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginTop: 35 },
  buttonText: { color: colors.white, fontWeight: 'bold' },
});

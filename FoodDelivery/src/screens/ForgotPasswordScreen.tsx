
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  const sendCode = () => {
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Введите электронную почту');
      return;
    }
    navigation.navigate('Verification');
  };

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={s.back}>‹</Text>
      </TouchableOpacity>

      <Text style={s.title}>Forgot Password</Text>
      <Text style={s.subtitle}>
        Please sign in to your existing account
      </Text>

      <View style={s.form}>
        <Text style={s.label}>EMAIL</Text>
        <TextInput
          style={s.input}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={s.button} onPress={sendCode}>
          <Text style={s.buttonText}>SEND CODE</Text>
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
  title: { color: colors.white, fontSize: 27, fontWeight: 'bold', textAlign: 'center', marginTop: 45 },
  subtitle: { color: '#C5C3D0', textAlign: 'center', marginTop: 10, marginBottom: 45 },
  form: {
    flex: 1, backgroundColor: colors.white,
    borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25,
  },
  label: { color: '#555', fontSize: 11, fontWeight: 'bold', marginTop: 20 },
  input: { height: 52, backgroundColor: colors.lightGray, borderRadius: 9, paddingHorizontal: 15, marginTop: 9 },
  button: { height: 52, backgroundColor: colors.orange, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginTop: 28 },
  buttonText: { color: colors.white, fontWeight: 'bold' },
});

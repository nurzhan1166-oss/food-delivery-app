
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const register = () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }
    navigation.navigate('Verification');
  };

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={s.back}>‹</Text>
      </TouchableOpacity>

      <Text style={s.title}>Sign Up</Text>
      <Text style={s.subtitle}>Please sign up to get started</Text>

      <View style={s.form}>
        <Text style={s.label}>NAME</Text>
        <TextInput style={s.input} placeholder="John Doe"
          value={name} onChangeText={setName} />

        <Text style={s.label}>EMAIL</Text>
        <TextInput style={s.input} placeholder="example@gmail.com"
          keyboardType="email-address" autoCapitalize="none"
          value={email} onChangeText={setEmail} />

        <Text style={s.label}>PASSWORD</Text>
        <TextInput style={s.input} placeholder="Password"
          secureTextEntry value={password} onChangeText={setPassword} />

        <Text style={s.label}>RE-TYPE PASSWORD</Text>
        <TextInput style={s.input} placeholder="Repeat password"
          secureTextEntry value={confirm} onChangeText={setConfirm} />

        <TouchableOpacity style={s.button} onPress={register}>
          <Text style={s.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <Text style={s.footer}>
          Already have an account?{' '}
          <Text style={s.link} onPress={() => navigation.navigate('Login')}>
            LOG IN
          </Text>
        </Text>
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
  title: { color: colors.white, fontSize: 29, fontWeight: 'bold', textAlign: 'center', marginTop: 25 },
  subtitle: { color: '#C5C3D0', textAlign: 'center', marginTop: 8, marginBottom: 35 },
  form: {
    flex: 1, backgroundColor: colors.white,
    borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25,
  },
  label: { fontSize: 11, color: '#555', fontWeight: 'bold', marginTop: 13 },
  input: { height: 48, backgroundColor: colors.lightGray, borderRadius: 9, paddingHorizontal: 14, marginTop: 7 },
  button: { height: 52, backgroundColor: colors.orange, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginTop: 25 },
  buttonText: { color: colors.white, fontWeight: 'bold' },
  footer: { textAlign: 'center', marginTop: 25, color: '#777', fontSize: 12 },
  link: { color: colors.orange, fontWeight: 'bold' },
});

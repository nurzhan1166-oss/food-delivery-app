
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    navigation.replace('Location');
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <Text style={s.title}>Log In</Text>
        <Text style={s.subtitle}>Please sign in to your existing account</Text>
      </View>

      <View style={s.form}>
        <Text style={s.label}>EMAIL</Text>
        <TextInput
          style={s.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#A5A5B5"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={s.label}>PASSWORD</Text>
        <TextInput
          style={s.input}
          placeholder="Enter password"
          placeholderTextColor="#A5A5B5"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={s.row}>
          <Text style={s.remember}>□ Remember me</Text>
          <Text style={s.link}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </Text>
        </View>

        <TouchableOpacity style={s.button} onPress={login}>
          <Text style={s.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={s.bottom}>
          <Text style={s.bottomText}>Don't have an account? </Text>
          <Text style={s.link}
            onPress={() => navigation.navigate('SignUp')}>
            SIGN UP
          </Text>
        </View>

        <Text style={s.or}>Or</Text>
        <Text style={s.social}>● Facebook       ● Twitter       ● Apple</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingTop: 105, paddingBottom: 65, alignItems: 'center' },
  title: { color: colors.white, fontSize: 30, fontWeight: 'bold' },
  subtitle: { color: '#C5C3D0', marginTop: 10, fontSize: 12 },
  form: {
    flex: 1, backgroundColor: colors.white,
    borderTopLeftRadius: 25, borderTopRightRadius: 25,
    padding: 25,
  },
  label: { fontSize: 11, color: '#555', fontWeight: 'bold', marginTop: 18 },
  input: {
    height: 52, backgroundColor: colors.lightGray,
    borderRadius: 9, paddingHorizontal: 15, marginTop: 8,
    color: colors.text,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  remember: { color: '#777', fontSize: 12 },
  link: { color: colors.orange, fontWeight: 'bold', fontSize: 12 },
  button: {
    height: 52, backgroundColor: colors.orange,
    borderRadius: 9, alignItems: 'center',
    justifyContent: 'center', marginTop: 28,
  },
  buttonText: { color: colors.white, fontWeight: 'bold' },
  bottom: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  bottomText: { color: '#777', fontSize: 12 },
  or: { textAlign: 'center', marginTop: 25, color: '#888' },
  social: { textAlign: 'center', marginTop: 22, color: colors.background },
});

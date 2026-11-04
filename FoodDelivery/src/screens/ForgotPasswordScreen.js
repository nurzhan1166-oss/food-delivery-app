import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Құпия сөзді ұмыттым экраны
export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor={colors.gray}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Басқанда код енгізу экраны ашылады */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verification')}>
          <Text style={styles.buttonText}>SEND CODE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark },
  top: { paddingTop: 100, paddingBottom: 40, alignItems: 'center' },
  back: {
    position: 'absolute',
    top: 56,
    left: 24,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 28, color: colors.dark },
  title: { fontSize: 30, fontWeight: '700', color: colors.white },
  subtitle: { marginTop: 8, fontSize: 14, color: colors.white, opacity: 0.8 },
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: { marginTop: 16, marginBottom: 8, fontSize: 13, color: colors.text },
  input: {
    height: 56,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.light,
    fontSize: 14,
    color: colors.text,
  },
  button: {
    height: 56,
    marginTop: 32,
    borderRadius: 12,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: '700', color: colors.white },
});
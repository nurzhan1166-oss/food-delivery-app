import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Растау коды экраны (4 ұяшық)
export default function VerificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>We have sent a code to your email</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.head}>
          <Text style={styles.label}>CODE</Text>
          <Text style={styles.resend}>Resend in 50 sec</Text>
        </View>

        {/* Төрт ұяшық, әрқайсысына бір сан */}
        <View style={styles.boxes}>
          {[0, 1, 2, 3].map((i) => (
            <TextInput
              key={i}
              style={styles.box}
              maxLength={1}
              keyboardType="number-pad"
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark },
  top: { paddingTop: 100, paddingBottom: 40, alignItems: 'center', paddingHorizontal: 24 },
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
  subtitle: { marginTop: 8, fontSize: 14, color: colors.white, opacity: 0.8, textAlign: 'center' },
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 13, color: colors.text },
  resend: { fontSize: 13, color: colors.orange },
  boxes: { flexDirection: 'row', gap: 16, marginTop: 12 },
  box: {
    width: 62,
    height: 62,
    borderRadius: 12,
    backgroundColor: colors.light,
    fontSize: 20,
    fontWeight: '600',
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
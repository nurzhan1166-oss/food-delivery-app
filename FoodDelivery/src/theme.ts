
import { StyleSheet } from 'react-native';

export const colors = {
  background: '#151426',
  orange: '#FF7417',
  white: '#FFFFFF',
  text: '#20202D',
  gray: '#A5A5B5',
  lightGray: '#F1F4F8',
  dark: '#10101F',
  border: '#E5E7EB',
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.lightGray,
    height: 54,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 14,
    marginTop: 8,
  },
  button: {
    backgroundColor: colors.orange,
    height: 54,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export const styles = globalStyles;

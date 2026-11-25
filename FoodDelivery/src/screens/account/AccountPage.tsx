import React, { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';

type Props = {
  title: string;
  description: string;
  onBack: () => void;
  children: ReactNode;
};

export default function AccountPage({ title, description, onBack, children }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to profile"
        >
          <Text style={styles.backText}>‹  Profile</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.card}>{children}</View>
      </ScrollView>
    </View>
  );
}

export const accountStyles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E8E8',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    color: '#777',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  emptyState: {
    color: '#777',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    paddingVertical: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 45,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  backText: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 22,
    marginTop: 8,
  },
  description: {
    color: '#777',
    fontSize: 13,
    lineHeight: 19,
    marginHorizontal: 22,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#F7F7F8',
    borderRadius: 13,
    marginHorizontal: 22,
    marginTop: 24,
    paddingHorizontal: 16,
  },
});

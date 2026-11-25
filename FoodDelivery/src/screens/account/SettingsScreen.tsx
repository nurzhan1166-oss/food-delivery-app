import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import AccountPage, { accountStyles as s } from './AccountPage';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  return (
    <AccountPage
      title="Settings"
      description="Your app preferences."
      onBack={() => navigation.goBack()}
    >
      <View style={[s.row, s.rowLast]}>
        <Text style={s.label}>App status</Text>
        <Text style={s.value}>Settings are up to date.</Text>
      </View>
    </AccountPage>
  );
}

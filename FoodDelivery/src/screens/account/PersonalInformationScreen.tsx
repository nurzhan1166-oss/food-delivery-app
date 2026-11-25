import React from 'react';
import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import AccountPage, { accountStyles as s } from './AccountPage';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalInformation'>;

export default function PersonalInformationScreen({ navigation }: Props) {
  return (
    <AccountPage
      title="Personal information"
      description="Your account details."
      onBack={() => navigation.goBack()}
    >
      <Text style={s.emptyState}>No personal information has been added yet.</Text>
    </AccountPage>
  );
}

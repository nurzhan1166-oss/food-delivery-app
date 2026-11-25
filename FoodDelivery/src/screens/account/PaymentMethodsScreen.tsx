import React from 'react';
import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import AccountPage, { accountStyles as s } from './AccountPage';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethods'>;

export default function PaymentMethodsScreen({ navigation }: Props) {
  return (
    <AccountPage
      title="Payment methods"
      description="Manage the ways you pay for your orders."
      onBack={() => navigation.goBack()}
    >
      <Text style={s.emptyState}>No payment methods have been added yet.</Text>
    </AccountPage>
  );
}

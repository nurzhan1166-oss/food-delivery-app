import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import AccountPage, { accountStyles as s } from './AccountPage';

type Props = NativeStackScreenProps<RootStackParamList, 'DeliveryAddresses'>;

export default function DeliveryAddressesScreen({ navigation }: Props) {
  return (
    <AccountPage
      title="Delivery addresses"
      description="The address currently used for delivery."
      onBack={() => navigation.goBack()}
    >
      <View style={[s.row, s.rowLast]}>
        <Text style={s.label}>Home</Text>
        <Text style={s.value}>Almaty, Kazakhstan</Text>
      </View>
    </AccountPage>
  );
}

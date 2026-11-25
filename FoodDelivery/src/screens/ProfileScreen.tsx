import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation';
import BottomBar from './home/BottomBar';
import { homeStyles as s } from './home/homeStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <Text style={s.pageTitle}>Profile</Text>
        <View style={s.profileCard}>
          <Text style={s.profileAvatar}>👤</Text>
          <View>
            <Text style={s.restaurantName}>Welcome!</Text>
            <Text style={s.restaurantType}>Manage your account</Text>
          </View>
        </View>
        {([
          ['Personal information', 'PersonalInformation'],
          ['Delivery addresses', 'DeliveryAddresses'],
          ['Payment methods', 'PaymentMethods'],
          ['Settings', 'Settings'],
        ] as const).map(([label, route]) => (
          <TouchableOpacity
            key={label}
            style={s.profileRow}
            onPress={() => navigation.navigate(route)}
            accessibilityRole="button"
          >
            <Text style={s.profileRowText}>{label}</Text>
            <Text style={s.profileChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomBar activeRoute="Profile" navigation={navigation} />
    </View>
  );
}

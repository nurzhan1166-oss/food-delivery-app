import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../navigation';
import { useHome } from './HomeContext';
import { homeStyles as s } from './homeStyles';

type Props = {
  activeRoute: keyof Pick<RootStackParamList, 'Home' | 'Search' | 'Cart' | 'Profile'>;
  navigation: {
    navigate: (route: 'Home' | 'Search' | 'Cart' | 'Profile') => void;
  };
};

export default function BottomBar({ activeRoute, navigation }: Props) {
  const { cartCount } = useHome();
  return (
    <View style={s.bottomBar}>
      {([
        ['Home', '🏠'],
        ['Search', '🔍'],
        ['Cart', '🛒'],
        ['Profile', '👤'],
      ] as const).map(([tab, icon]) => (
        <TouchableOpacity
          key={tab}
          style={s.bottomTab}
          onPress={() => navigation.navigate(tab)}
          accessibilityRole="button"
          accessibilityState={{ selected: activeRoute === tab }}
          accessibilityLabel={tab === 'Cart' ? `Cart, ${cartCount} items` : tab}
        >
          <Text style={[s.bottomItem, activeRoute === tab && s.activeBottomItem]}>
            {icon} {tab}{tab === 'Cart' && cartCount > 0 ? ` (${cartCount})` : ''}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

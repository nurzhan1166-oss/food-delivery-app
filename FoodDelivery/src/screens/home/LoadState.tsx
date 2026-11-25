import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';
import { homeStyles as s } from './homeStyles';

type Props = {
  loading: boolean;
  loadError: string;
  recipesCount: number;
  onRetry: () => void;
};

export default function LoadState({ loading, loadError, recipesCount, onRetry }: Props) {
  if (loading) {
    return (
      <View style={s.messageState}>
        <ActivityIndicator color={colors.orange} />
        <Text style={s.emptyText}>Рецепттер серверден жүктелуде...</Text>
      </View>
    );
  }
  if (loadError) {
    return (
      <View style={s.messageState}>
        <Text style={s.errorTitle}>API қатесі</Text>
        <Text style={s.emptyText}>{loadError}</Text>
        <TouchableOpacity style={s.primaryButton} onPress={onRetry} accessibilityRole="button">
          <Text style={s.primaryButtonText}>Қайта жүктеу</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <View style={s.messageState}><Text style={s.loadedText}>API-ден {recipesCount} рецепт жүктелді</Text></View>;
}

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.value}>{String(value)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 20,
    marginTop: 6,
  },
});

export default StatCard;

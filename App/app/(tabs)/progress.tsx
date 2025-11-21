import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import ProgressChart from '@/components/ui/stat-card';

export default function ProgressScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Progress</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>Overview of your performance</ThemedText>

        <View style={{ marginTop: 12 }}>
          <ThemedText>Avg Score: 78%</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

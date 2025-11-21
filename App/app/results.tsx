import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { getLastResult } from '@/data/session';
import { useRouter } from 'expo-router';

export default function ResultsScreen() {
  const router = useRouter();
  const r = getLastResult();

  if (!r) {
    return (
      <ThemedView style={styles.container}>
        <View style={{ padding: 16 }}>
          <ThemedText>No result available. Take a quiz first.</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={{ padding: 16 }}>
        <ThemedText type="title">Your Result</ThemedText>
        <ThemedText style={{ marginTop: 12, fontSize: 28 }}>{r.score}%</ThemedText>

        <View style={{ marginTop: 12 }}>
          <ThemedText>Correct: {r.correct}</ThemedText>
          <ThemedText>Wrong: {r.wrong}</ThemedText>
          <ThemedText>Skipped: {r.skipped}</ThemedText>
        </View>

        <View style={{ marginTop: 16 }}>
          <ThemedText type="subtitle">Tips</ThemedText>
          <ThemedText style={{ marginTop: 8 }}>Review common denominators for adding fractions.</ThemedText>
        </View>

        <View style={{ marginTop: 20, flexDirection: 'row', gap: 12 }}>
          <Button onPress={() => router.push('/quiz')}>Retry</Button>
          <Button onPress={() => router.push('/(tabs)')}>Home</Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

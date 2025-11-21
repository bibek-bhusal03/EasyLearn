import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ProgressBar from './progress-bar';
import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';

export function ChapterCard({ chapter }: { chapter: { id: string; title: string; progress: number; status: string } }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText type="defaultSemiBold">{chapter.title}</ThemedText>
        <ThemedText style={{ fontSize: 12 }}>{chapter.status}</ThemedText>
      </View>
      <View style={{ marginTop: 8 }}>
        <ProgressBar value={chapter.progress} />
      </View>
      <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
        <Link href="/quiz">
          <Link.Trigger>
            <ThemedText type="defaultSemiBold">Start</ThemedText>
          </Link.Trigger>
        </Link>
      </View>
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
});

export default ChapterCard;

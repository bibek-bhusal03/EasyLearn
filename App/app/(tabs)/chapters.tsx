import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import ChapterCard from '@/components/ui/chapter-card';
import { chapters } from '@/data/mockData';

export default function ChaptersScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Chapters</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>Find chapters and start quizzes</ThemedText>

        <View style={{ marginTop: 12 }}>
          {chapters.map((c) => (
            <ChapterCard key={c.id} chapter={c} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

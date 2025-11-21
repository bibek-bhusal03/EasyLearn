import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { studentProfile } from '@/data/mockData';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={{ padding: 16 }}>
        <ThemedText type="title">Profile</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>{studentProfile.name}</ThemedText>
        <ThemedText style={{ marginTop: 4 }}>Avg Score: {studentProfile.avgScore}%</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

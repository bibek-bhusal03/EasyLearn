import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome back</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>Sign in to continue to EasyLearn</ThemedText>

      <View style={styles.form}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput style={styles.input} placeholder="teacher@example.com" keyboardType="email-address" />
        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput style={styles.input} placeholder="••••••" secureTextEntry />

        <View style={{ marginTop: 12 }}>
          {/* Using Link for demo navigation */}
          <Button onPress={() => router.push('/(tabs)')}>Sign In</Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  form: {
    marginTop: 20,
  },
  label: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
});

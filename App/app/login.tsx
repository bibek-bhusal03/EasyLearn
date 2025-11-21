import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo/Brand Section */}
          <View style={styles.brandSection}>
            <View style={[styles.logoContainer, { backgroundColor: isDark ? '#3B82F6' : '#2563EB' }]}>
              <ThemedText style={styles.logoText}>EL</ThemedText>
            </View>
            <ThemedText style={styles.brandName}>EasyLearn</ThemedText>
            <ThemedText style={[styles.tagline, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Master Math, One Quiz at a Time
            </ThemedText>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <ThemedText type="title" style={styles.welcomeText}>Welcome Back</ThemedText>
            <ThemedText style={[styles.subtitle, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Sign in to continue your learning journey
            </ThemedText>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? '#1E2022' : '#F5F5F5',
                      color: isDark ? '#ECEDEE' : '#11181C',
                      borderColor: isDark ? '#2D3134' : '#E0E0E0'
                    }
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor={isDark ? '#687076' : '#9BA1A6'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? '#1E2022' : '#F5F5F5',
                      color: isDark ? '#ECEDEE' : '#11181C',
                      borderColor: isDark ? '#2D3134' : '#E0E0E0'
                    }
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={isDark ? '#687076' : '#9BA1A6'}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <ThemedText style={[styles.forgotText, { color: '#3B82F6' }]}>
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={[styles.divider, { backgroundColor: isDark ? '#2D3134' : '#E0E0E0' }]} />
                <ThemedText style={[styles.dividerText, { color: isDark ? '#687076' : '#9BA1A6' }]}>
                  or
                </ThemedText>
                <View style={[styles.divider, { backgroundColor: isDark ? '#2D3134' : '#E0E0E0' }]} />
              </View>

              <TouchableOpacity
                style={[styles.socialButton, {
                  backgroundColor: isDark ? '#1E2022' : '#F5F5F5',
                  borderColor: isDark ? '#2D3134' : '#E0E0E0'
                }]}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.socialButtonText}>Continue with Google</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.signupContainer}>
              <ThemedText style={[styles.signupText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Don't have an account?{' '}
              </ThemedText>
              <TouchableOpacity>
                <ThemedText style={[styles.signupLink, { color: '#3B82F6' }]}>Sign Up</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { getLastResult } from '@/data/session';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ResultsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const r = getLastResult();

  if (!r) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.emptyState}>
          <IconSymbol name="doc.text" size={64} color={isDark ? '#4B5563' : '#9CA3AF'} />
          <ThemedText style={[styles.emptyTitle, { color: isDark ? '#9BA1A6' : '#687076' }]}>
            No Results Yet
          </ThemedText>
          <ThemedText style={[styles.emptyDesc, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
            Take a quiz to see your results here
          </ThemedText>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/quiz')}
          >
            <ThemedText style={styles.emptyButtonText}>Start Quiz</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  const getScoreColor = () => {
    if (r.score >= 80) return '#10B981';
    if (r.score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreEmoji = () => {
    if (r.score >= 80) return 'Excellent!';
    if (r.score >= 60) return 'Good Job!';
    return 'Keep Practicing!';
  };

  const getScoreMessage = () => {
    if (r.score >= 80) return "Outstanding performance! You've mastered this topic.";
    if (r.score >= 60) return "Good effort! Review the topics you missed.";
    return "Don't give up! Practice makes perfect.";
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Score Circle */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: getScoreColor() }]}>
            <ThemedText style={[styles.scoreValue, { color: getScoreColor() }]}>
              {r.score}%
            </ThemedText>
            <ThemedText style={[styles.scoreLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Score
            </ThemedText>
          </View>
          <ThemedText type="title" style={[styles.scoreTitle, { color: getScoreColor() }]}>
            {getScoreEmoji()}
          </ThemedText>
          <ThemedText style={[styles.scoreMessage, { color: isDark ? '#9BA1A6' : '#687076' }]}>
            {getScoreMessage()}
          </ThemedText>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#10B98115' }]}>
            <IconSymbol name="checkmark.circle.fill" size={24} color="#10B981" />
            <ThemedText style={[styles.statValue, { color: '#10B981' }]}>{r.correct}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Correct
            </ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#EF444415' }]}>
            <IconSymbol name="xmark.circle.fill" size={24} color="#EF4444" />
            <ThemedText style={[styles.statValue, { color: '#EF4444' }]}>{r.wrong}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Wrong
            </ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B15' }]}>
            <IconSymbol name="minus.circle.fill" size={24} color="#F59E0B" />
            <ThemedText style={[styles.statValue, { color: '#F59E0B' }]}>{r.skipped}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Skipped
            </ThemedText>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressSection, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
          <ThemedText style={styles.progressTitle}>Performance Breakdown</ThemedText>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { backgroundColor: isDark ? '#2D3134' : '#E5E7EB' }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(r.correct / r.total) * 100}%`, backgroundColor: '#10B981' }
                ]}
              />
              <View
                style={[
                  styles.progressFill,
                  { width: `${(r.wrong / r.total) * 100}%`, backgroundColor: '#EF4444' }
                ]}
              />
              <View
                style={[
                  styles.progressFill,
                  { width: `${(r.skipped / r.total) * 100}%`, backgroundColor: '#F59E0B' }
                ]}
              />
            </View>
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <ThemedText style={[styles.legendText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Correct ({Math.round((r.correct / r.total) * 100)}%)
              </ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <ThemedText style={[styles.legendText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Wrong ({Math.round((r.wrong / r.total) * 100)}%)
              </ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <ThemedText style={[styles.legendText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Skipped ({Math.round((r.skipped / r.total) * 100)}%)
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={[styles.tipsSection, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
          <View style={styles.tipsHeader}>
            <IconSymbol name="lightbulb.fill" size={20} color="#F59E0B" />
            <ThemedText style={styles.tipsTitle}>Tips for Improvement</ThemedText>
          </View>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipBullet}>1.</ThemedText>
              <ThemedText style={[styles.tipText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Review common denominators when adding fractions
              </ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipBullet}>2.</ThemedText>
              <ThemedText style={[styles.tipText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Practice converting between fractions and decimals
              </ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipBullet}>3.</ThemedText>
              <ThemedText style={[styles.tipText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Try solving problems without a calculator first
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.push('/quiz')}
            activeOpacity={0.8}
          >
            <IconSymbol name="arrow.counterclockwise" size={20} color="#FFFFFF" />
            <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.homeButton, { backgroundColor: isDark ? '#1E2022' : '#F5F5F5' }]}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}
          >
            <IconSymbol name="house.fill" size={20} color={isDark ? '#ECEDEE' : '#11181C'} />
            <ThemedText style={styles.homeButtonText}>Go Home</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 24,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreValue: {
    fontSize: 42,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  scoreTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  scoreMessage: {
    fontSize: 14,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  progressSection: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
  tipsSection: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
  },
  tipBullet: {
    fontWeight: '600',
    width: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { performanceStats, weeklyProgress, subjectPerformance, leaderboard } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const maxWeeklyScore = Math.max(...weeklyProgress.map(d => d.score));

  const statsCards = [
    { label: 'Avg Score', value: `${performanceStats.avgScore}%`, icon: 'chart.bar.fill', color: '#3B82F6' },
    { label: 'Best Score', value: `${performanceStats.bestScore}%`, icon: 'star.fill', color: '#F59E0B' },
    { label: 'Improvement', value: `+${performanceStats.improvement}%`, icon: 'arrow.up.right', color: '#10B981' },
    { label: 'Time Spent', value: performanceStats.timeSpent, icon: 'clock.fill', color: '#8B5CF6' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Progress</ThemedText>
          <ThemedText style={[styles.subtitle, { color: isDark ? '#9BA1A6' : '#687076' }]}>
            Track your learning journey
          </ThemedText>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <View
              key={index}
              style={[styles.statCard, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}
            >
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <IconSymbol name={stat.icon as any} size={18} color={stat.color} />
              </View>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Weekly Progress Chart */}
        <View style={[styles.section, styles.chartSection, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Weekly Performance</ThemedText>
          <View style={styles.chartContainer}>
            {weeklyProgress.map((day, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(day.score / maxWeeklyScore) * 100}%`,
                        backgroundColor: day.score >= 80 ? '#10B981' : day.score >= 60 ? '#F59E0B' : '#EF4444'
                      }
                    ]}
                  />
                </View>
                <ThemedText style={[styles.barLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                  {day.day}
                </ThemedText>
                <ThemedText style={styles.barValue}>{day.score}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Subject Performance */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Subject Performance</ThemedText>
          <View style={[styles.subjectContainer, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
            {subjectPerformance.map((subject, index) => (
              <View
                key={index}
                style={[
                  styles.subjectItem,
                  index !== subjectPerformance.length - 1 && styles.subjectBorder,
                  { borderColor: isDark ? '#2D3134' : '#E0E0E0' }
                ]}
              >
                <View style={styles.subjectInfo}>
                  <ThemedText style={styles.subjectName}>{subject.subject}</ThemedText>
                  <ThemedText style={[styles.subjectQuizzes, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                    {subject.quizzes} quizzes completed
                  </ThemedText>
                </View>
                <View style={styles.subjectScore}>
                  <ThemedText
                    style={[
                      styles.scoreValue,
                      { color: subject.score >= 80 ? '#10B981' : subject.score >= 60 ? '#F59E0B' : '#EF4444' }
                    ]}
                  >
                    {subject.score}%
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Leaderboard</ThemedText>
          <View style={[styles.leaderboardContainer, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
            {leaderboard.map((user, index) => (
              <View
                key={index}
                style={[
                  styles.leaderboardItem,
                  user.isCurrentUser && styles.currentUserItem,
                  user.isCurrentUser && { backgroundColor: isDark ? '#2D3134' : '#E0F2FE' },
                  index !== leaderboard.length - 1 && !user.isCurrentUser && styles.leaderboardBorder,
                  { borderColor: isDark ? '#2D3134' : '#E0E0E0' }
                ]}
              >
                <View style={[
                  styles.rankBadge,
                  {
                    backgroundColor: user.rank === 1 ? '#F59E0B' : user.rank === 2 ? '#9CA3AF' : user.rank === 3 ? '#CD7F32' : isDark ? '#2D3134' : '#E5E7EB'
                  }
                ]}>
                  <ThemedText style={[styles.rankText, user.rank <= 3 && { color: '#FFFFFF' }]}>
                    {user.rank}
                  </ThemedText>
                </View>
                <View style={[styles.userAvatar, { backgroundColor: user.isCurrentUser ? '#3B82F6' : '#6B7280' }]}>
                  <ThemedText style={styles.avatarText}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </ThemedText>
                </View>
                <View style={styles.userInfo}>
                  <ThemedText style={[styles.userName, user.isCurrentUser && { fontWeight: '700' }]}>
                    {user.name} {user.isCurrentUser && '(You)'}
                  </ThemedText>
                </View>
                <ThemedText style={[styles.userScore, { color: '#3B82F6' }]}>{user.score}%</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Questions Stats */}
        <View style={[styles.section, styles.questionsSection, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Questions Overview</ThemedText>
          <View style={styles.questionsStats}>
            <View style={styles.questionsItem}>
              <ThemedText style={[styles.questionsValue, { color: '#3B82F6' }]}>
                {performanceStats.questionsAnswered}
              </ThemedText>
              <ThemedText style={[styles.questionsLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Total Answered
              </ThemedText>
            </View>
            <View style={[styles.questionsDivider, { backgroundColor: isDark ? '#2D3134' : '#E0E0E0' }]} />
            <View style={styles.questionsItem}>
              <ThemedText style={[styles.questionsValue, { color: '#10B981' }]}>
                {performanceStats.correctAnswers}
              </ThemedText>
              <ThemedText style={[styles.questionsLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Correct
              </ThemedText>
            </View>
            <View style={[styles.questionsDivider, { backgroundColor: isDark ? '#2D3134' : '#E0E0E0' }]} />
            <View style={styles.questionsItem}>
              <ThemedText style={[styles.questionsValue, { color: '#EF4444' }]}>
                {performanceStats.questionsAnswered - performanceStats.correctAnswers}
              </ThemedText>
              <ThemedText style={[styles.questionsLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                Incorrect
              </ThemedText>
            </View>
          </View>
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
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  chartSection: {
    borderRadius: 16,
    padding: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingTop: 20,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    height: 100,
    width: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    marginTop: 8,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  subjectContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  subjectBorder: {
    borderBottomWidth: 1,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  subjectQuizzes: {
    fontSize: 12,
  },
  subjectScore: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  leaderboardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  currentUserItem: {
    borderRadius: 12,
    margin: 4,
  },
  leaderboardBorder: {
    borderBottomWidth: 1,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
  },
  userScore: {
    fontSize: 14,
    fontWeight: '700',
  },
  questionsSection: {
    borderRadius: 16,
    padding: 16,
  },
  questionsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  questionsItem: {
    alignItems: 'center',
  },
  questionsValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  questionsLabel: {
    fontSize: 12,
  },
  questionsDivider: {
    width: 1,
    height: 40,
  },
});

import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { studentProfile, recentActivity, chapters, performanceStats } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const quickStats = [
    { label: 'Avg Score', value: `${performanceStats.avgScore}%`, icon: 'chart.bar.fill', color: '#3B82F6' },
    { label: 'Streak', value: `${performanceStats.streak} days`, icon: 'flame.fill', color: '#EF4444' },
    { label: 'Quizzes', value: `${performanceStats.totalQuizzes}`, icon: 'checkmark.circle.fill', color: '#10B981' },
  ];

  const continueChapter = chapters.find(c => c.status === 'In Progress');

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={[styles.greeting, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Welcome back,
            </ThemedText>
            <ThemedText type="title" style={styles.name}>{studentProfile.name}</ThemedText>
          </View>
          <TouchableOpacity
            style={[styles.avatar, { backgroundColor: isDark ? '#3B82F6' : '#2563EB' }]}
            onPress={() => router.push('/profile')}
          >
            <ThemedText style={styles.avatarText}>
              {studentProfile.name.split(' ').map(n => n[0]).join('')}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <View
              key={index}
              style={[
                styles.statCard,
                { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }
              ]}
            >
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <IconSymbol name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Continue Learning */}
        {continueChapter && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Continue Learning</ThemedText>
            <TouchableOpacity
              style={[
                styles.continueCard,
                { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }
              ]}
              onPress={() => router.push('/quiz')}
              activeOpacity={0.7}
            >
              <View style={[styles.continueIcon, { backgroundColor: continueChapter.color }]}>
                <ThemedText style={styles.continueIconText}>
                  {continueChapter.title.charAt(0)}
                </ThemedText>
              </View>
              <View style={styles.continueContent}>
                <ThemedText style={styles.continueTitle}>{continueChapter.title}</ThemedText>
                <ThemedText style={[styles.continueDesc, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                  {continueChapter.completedLessons}/{continueChapter.lessons} lessons completed
                </ThemedText>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${continueChapter.progress}%`, backgroundColor: continueChapter.color }
                    ]}
                  />
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={isDark ? '#9BA1A6' : '#687076'} />
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
          <View style={[styles.activityContainer, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
            {recentActivity.map((activity, index) => (
              <View
                key={activity.id}
                style={[
                  styles.activityItem,
                  index !== recentActivity.length - 1 && styles.activityBorder,
                  { borderColor: isDark ? '#2D3134' : '#E0E0E0' }
                ]}
              >
                <View style={[
                  styles.activityIcon,
                  {
                    backgroundColor: activity.type === 'quiz'
                      ? '#3B82F620'
                      : activity.type === 'lesson'
                        ? '#10B98120'
                        : '#F59E0B20'
                  }
                ]}>
                  <IconSymbol
                    name={
                      activity.type === 'quiz'
                        ? 'doc.text.fill'
                        : activity.type === 'lesson'
                          ? 'book.fill'
                          : 'star.fill'
                    }
                    size={16}
                    color={
                      activity.type === 'quiz'
                        ? '#3B82F6'
                        : activity.type === 'lesson'
                          ? '#10B981'
                          : '#F59E0B'
                    }
                  />
                </View>
                <View style={styles.activityContent}>
                  <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                  <ThemedText style={[styles.activityDate, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                    {activity.date}
                    {activity.type === 'quiz' && ` • Score: ${activity.score}%`}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: '#3B82F6' }]}
              onPress={() => router.push('/quiz')}
              activeOpacity={0.8}
            >
              <IconSymbol name="play.fill" size={24} color="#FFFFFF" />
              <ThemedText style={styles.actionText}>Start Quiz</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: '#10B981' }]}
              onPress={() => router.push('/chapters')}
              activeOpacity={0.8}
            >
              <IconSymbol name="book.fill" size={24} color="#FFFFFF" />
              <ThemedText style={styles.actionText}>Browse Chapters</ThemedText>
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
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
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  continueIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  continueIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  continueDesc: {
    fontSize: 12,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  activityContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  activityBorder: {
    borderBottomWidth: 1,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

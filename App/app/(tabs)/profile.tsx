import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { studentProfile, achievements, performanceStats } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const menuItems = [
    { icon: 'gearshape.fill', label: 'Settings', color: '#6B7280' },
    { icon: 'bell.fill', label: 'Notifications', color: '#3B82F6' },
    { icon: 'questionmark.circle.fill', label: 'Help & Support', color: '#10B981' },
    { icon: 'info.circle.fill', label: 'About', color: '#8B5CF6' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => router.replace('/login') },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarLarge, { backgroundColor: isDark ? '#3B82F6' : '#2563EB' }]}>
            <ThemedText style={styles.avatarTextLarge}>
              {studentProfile.name.split(' ').map(n => n[0]).join('')}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.userName}>{studentProfile.name}</ThemedText>
          <ThemedText style={[styles.userEmail, { color: isDark ? '#9BA1A6' : '#687076' }]}>
            {studentProfile.email}
          </ThemedText>
          <View style={styles.userBadges}>
            <View style={[styles.badge, { backgroundColor: isDark ? '#1E2022' : '#F5F5F5' }]}>
              <ThemedText style={[styles.badgeText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                {studentProfile.grade}
              </ThemedText>
            </View>
            <View style={[styles.badge, { backgroundColor: isDark ? '#1E2022' : '#F5F5F5' }]}>
              <ThemedText style={[styles.badgeText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                {studentProfile.school}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={[styles.statsContainer, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{performanceStats.totalQuizzes}</ThemedText>
            <ThemedText style={[styles.statText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Quizzes
            </ThemedText>
          </View>
          <View style={[styles.statDivider, { backgroundColor: isDark ? '#2D3134' : '#E0E0E0' }]} />
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{performanceStats.avgScore}%</ThemedText>
            <ThemedText style={[styles.statText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Avg Score
            </ThemedText>
          </View>
          <View style={[styles.statDivider, { backgroundColor: isDark ? '#2D3134' : '#E0E0E0' }]} />
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{performanceStats.streak}</ThemedText>
            <ThemedText style={[styles.statText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              Day Streak
            </ThemedText>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Achievements</ThemedText>
            <ThemedText style={[styles.achievementCount, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              {achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked
            </ThemedText>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' },
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.unlocked ? `${achievement.color}20` : isDark ? '#2D3134' : '#E5E7EB' }
                ]}>
                  <IconSymbol
                    name={achievement.icon as any}
                    size={24}
                    color={achievement.unlocked ? achievement.color : isDark ? '#4B5563' : '#9CA3AF'}
                  />
                </View>
                <ThemedText style={[
                  styles.achievementTitle,
                  !achievement.unlocked && { color: isDark ? '#6B7280' : '#9CA3AF' }
                ]}>
                  {achievement.title}
                </ThemedText>
                <ThemedText style={[
                  styles.achievementDesc,
                  { color: isDark ? '#9BA1A6' : '#687076' },
                  !achievement.unlocked && { color: isDark ? '#4B5563' : '#9CA3AF' }
                ]}>
                  {achievement.description}
                </ThemedText>
                {!achievement.unlocked && (
                  <View style={styles.lockedBadge}>
                    <IconSymbol name="lock.fill" size={10} color={isDark ? '#4B5563' : '#9CA3AF'} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Settings</ThemedText>
          <View style={[styles.menuContainer, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index !== menuItems.length - 1 && styles.menuBorder,
                  { borderColor: isDark ? '#2D3134' : '#E0E0E0' }
                ]}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                  <IconSymbol name={item.icon as any} size={18} color={item.color} />
                </View>
                <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
                <IconSymbol name="chevron.right" size={16} color={isDark ? '#9BA1A6' : '#687076'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#EF4444" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <ThemedText style={[styles.appVersion, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
            EasyLearn v1.0.0
          </ThemedText>
          <ThemedText style={[styles.joinedDate, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
            Member since {studentProfile.joinedDate}
          </ThemedText>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarTextLarge: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  userName: {
    fontSize: 24,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  userBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  achievementCount: {
    fontSize: 12,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 10,
    textAlign: 'center',
  },
  lockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  menuContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    gap: 8,
    marginBottom: 24,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  appVersion: {
    fontSize: 12,
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 12,
  },
});

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { chapters } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ChaptersScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'In Progress', 'New', 'Mastered'];

  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chapter.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || chapter.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Mastered': return '#10B981';
      case 'In Progress': return '#F59E0B';
      case 'New': return '#3B82F6';
      default: return '#9BA1A6';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Chapters</ThemedText>
          <ThemedText style={[styles.subtitle, { color: isDark ? '#9BA1A6' : '#687076' }]}>
            {chapters.length} chapters available
          </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E2022' : '#F5F5F5' }]}>
          <IconSymbol name="magnifyingglass" size={20} color={isDark ? '#9BA1A6' : '#687076'} />
          <TextInput
            style={[styles.searchInput, { color: isDark ? '#ECEDEE' : '#11181C' }]}
            placeholder="Search chapters..."
            placeholderTextColor={isDark ? '#687076' : '#9BA1A6'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter
                  ? { backgroundColor: '#3B82F6' }
                  : { backgroundColor: isDark ? '#1E2022' : '#F5F5F5' }
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  selectedFilter === filter && { color: '#FFFFFF' }
                ]}
              >
                {filter}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Chapters List */}
        <View style={styles.chaptersList}>
          {filteredChapters.map((chapter) => (
            <TouchableOpacity
              key={chapter.id}
              style={[styles.chapterCard, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}
              onPress={() => router.push('/quiz')}
              activeOpacity={0.7}
            >
              {/* Chapter Icon */}
              <View style={[styles.chapterIcon, { backgroundColor: chapter.color }]}>
                <ThemedText style={styles.chapterIconText}>
                  {chapter.title.charAt(0)}
                </ThemedText>
              </View>

              {/* Chapter Info */}
              <View style={styles.chapterInfo}>
                <View style={styles.chapterHeader}>
                  <ThemedText style={styles.chapterTitle}>{chapter.title}</ThemedText>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(chapter.status)}20` }]}>
                    <ThemedText style={[styles.statusText, { color: getStatusColor(chapter.status) }]}>
                      {chapter.status}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={[styles.chapterDesc, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                  {chapter.description}
                </ThemedText>

                {/* Progress Section */}
                <View style={styles.progressSection}>
                  <View style={styles.progressInfo}>
                    <IconSymbol name="book.fill" size={14} color={isDark ? '#9BA1A6' : '#687076'} />
                    <ThemedText style={[styles.progressText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
                      {chapter.completedLessons}/{chapter.lessons} lessons
                    </ThemedText>
                  </View>
                  <ThemedText style={[styles.progressPercent, { color: chapter.color }]}>
                    {chapter.progress}%
                  </ThemedText>
                </View>

                {/* Progress Bar */}
                <View style={[styles.progressBarContainer, { backgroundColor: isDark ? '#2D3134' : '#E5E7EB' }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${chapter.progress}%`, backgroundColor: chapter.color }
                    ]}
                  />
                </View>
              </View>

              {/* Arrow */}
              <IconSymbol name="chevron.right" size={20} color={isDark ? '#9BA1A6' : '#687076'} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {filteredChapters.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="magnifyingglass" size={48} color={isDark ? '#4B5563' : '#9CA3AF'} />
            <ThemedText style={[styles.emptyTitle, { color: isDark ? '#9BA1A6' : '#687076' }]}>
              No chapters found
            </ThemedText>
            <ThemedText style={[styles.emptyDesc, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
              Try adjusting your search or filter
            </ThemedText>
          </View>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chaptersList: {
    gap: 12,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  chapterIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  chapterIconText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  chapterDesc: {
    fontSize: 12,
    marginBottom: 10,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressText: {
    fontSize: 12,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    marginTop: 8,
  },
});

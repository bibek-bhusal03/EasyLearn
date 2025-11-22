import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { sampleQuiz } from '@/data/mockData';
import { setLastResult } from '@/data/session';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(300);
  const router = useRouter();
  const timerRef = useRef<number | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const q = sampleQuiz.questions[index];
  const totalQuestions = sampleQuiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000) as unknown as number;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      submitQuiz();
    }
  }, [secondsLeft]);

  function selectAnswer(qid: string, choiceIdx: number) {
    setAnswers((prev) => ({ ...prev, [qid]: choiceIdx }));
  }

  function submitQuiz() {
    const total = sampleQuiz.questions.length;
    let correct = 0;
    let skipped = 0;

    sampleQuiz.questions.forEach((qq) => {
      const ans = answers[qq.id];
      if (ans === undefined) skipped += 1;
      else if (ans === qq.answerIndex) correct += 1;
    });

    const wrong = total - correct - skipped;
    const score = Math.round((correct / total) * 100);

    setLastResult({ score, correct, wrong, skipped, total });
    router.push('/results');
  }

  const getTimerColor = () => {
    if (secondsLeft <= 60) return '#EF4444';
    if (secondsLeft <= 120) return '#F59E0B';
    return '#10B981';
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="xmark" size={20} color={isDark ? '#ECEDEE' : '#11181C'} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <ThemedText style={styles.quizTitle}>{sampleQuiz.title}</ThemedText>
          <ThemedText style={[styles.questionCount, { color: isDark ? '#9BA1A6' : '#687076' }]}>
            Question {index + 1} of {totalQuestions}
          </ThemedText>
        </View>
        <View style={[styles.timerBadge, { backgroundColor: `${getTimerColor()}20` }]}>
          <IconSymbol name="clock.fill" size={14} color={getTimerColor()} />
          <ThemedText style={[styles.timerText, { color: getTimerColor() }]}>
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
          </ThemedText>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressContainer, { backgroundColor: isDark ? '#2D3134' : '#E5E7EB' }]}>
        <View style={[styles.progressFill, { width: `${((index + 1) / totalQuestions) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Question */}
        <View style={styles.questionSection}>
          <View style={[styles.questionNumberBadge, { backgroundColor: '#3B82F620' }]}>
            <ThemedText style={styles.questionNumberText}>Q{index + 1}</ThemedText>
          </View>
          <ThemedText style={styles.questionText}>{q.text}</ThemedText>
        </View>

        {/* Choices */}
        <View style={styles.choicesContainer}>
          {q.choices.map((choice, i) => {
            const isSelected = answers[q.id] === i;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.choiceButton,
                  { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' },
                  isSelected && styles.choiceSelected
                ]}
                onPress={() => selectAnswer(q.id, i)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.choiceIndicator,
                  { borderColor: isDark ? '#4B5563' : '#D1D5DB' },
                  isSelected && styles.choiceIndicatorSelected
                ]}>
                  {isSelected && <View style={styles.choiceIndicatorDot} />}
                </View>
                <ThemedText style={[
                  styles.choiceText,
                  isSelected && styles.choiceTextSelected
                ]}>
                  {choice}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Question Dots */}
        <View style={styles.dotsContainer}>
          {sampleQuiz.questions.map((question, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.dot,
                { backgroundColor: isDark ? '#2D3134' : '#E5E7EB' },
                answers[question.id] !== undefined && styles.dotAnswered,
                i === index && styles.dotCurrent
              ]}
              onPress={() => setIndex(i)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: isDark ? '#1E2022' : '#F8F9FA' }]}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.prevButton,
            { backgroundColor: isDark ? '#2D3134' : '#E5E7EB' },
            index === 0 && styles.navButtonDisabled
          ]}
          onPress={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
        >
          <IconSymbol name="chevron.left" size={16} color={index === 0 ? '#9CA3AF' : isDark ? '#ECEDEE' : '#11181C'} />
          <ThemedText style={[styles.navButtonText, index === 0 && { color: '#9CA3AF' }]}>
            Previous
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.progressText, { color: isDark ? '#9BA1A6' : '#687076' }]}>
          {answeredCount}/{totalQuestions} answered
        </ThemedText>

        {index < totalQuestions - 1 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={() => setIndex(Math.min(totalQuestions - 1, index + 1))}
          >
            <ThemedText style={styles.nextButtonText}>Next</ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={submitQuiz}
          >
            <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
            <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  questionCount: {
    fontSize: 12,
    marginTop: 2,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    height: 4,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  questionSection: {
    marginBottom: 24,
  },
  questionNumberBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  questionNumberText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  choicesContainer: {
    gap: 12,
  },
  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  choiceSelected: {
    borderColor: '#10B981',
    backgroundColor: '#10B98110',
  },
  choiceIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceIndicatorSelected: {
    borderColor: '#10B981',
  },
  choiceIndicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  choiceText: {
    flex: 1,
    fontSize: 16,
  },
  choiceTextSelected: {
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotAnswered: {
    backgroundColor: '#10B981',
  },
  dotCurrent: {
    backgroundColor: '#3B82F6',
    transform: [{ scale: 1.3 }],
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 32,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  prevButton: {},
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressText: {
    fontSize: 12,
  },
  nextButton: {
    backgroundColor: '#3B82F6',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#10B981',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

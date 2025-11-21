import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { sampleQuiz } from '@/data/mockData';
import { setLastResult } from '@/data/session';
import { useRouter } from 'expo-router';

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 min timer
  const router = useRouter();
  const timerRef = useRef<number | null>(null);

  const q = sampleQuiz.questions[index];

  // start timer
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
    // navigate to results
    router.push('/results');
  }

  return (
    <ThemedView style={styles.container}>
      <View style={{ padding: 16 }}>
        <ThemedText type="subtitle">{sampleQuiz.title}</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>{`${index + 1} / ${sampleQuiz.questions.length}`}</ThemedText>

        <ThemedText style={{ marginTop: 6 }}>{`Time left: ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`}</ThemedText>

        <View style={{ marginTop: 12 }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>{q.text}</ThemedText>
          {q.choices.map((c, i) => (
            <TouchableOpacity key={i} style={[styles.choice, answers[q.id] === i ? { borderColor: '#10B981', borderWidth: 2 } : undefined]} onPress={() => selectAnswer(q.id, i)}>
              <ThemedText>{c}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <TouchableOpacity onPress={() => setIndex(Math.max(0, index - 1))}>
            <ThemedText>Previous</ThemedText>
          </TouchableOpacity>
          {index < sampleQuiz.questions.length - 1 ? (
            <TouchableOpacity onPress={() => setIndex(Math.min(sampleQuiz.questions.length - 1, index + 1))}>
              <ThemedText>Next</ThemedText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={submitQuiz}>
              <ThemedText type="defaultSemiBold">Submit</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  choice: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
});

// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import MoodButton from './MoodButton';

export default function App() {
  const [counts, setCounts] = useState({
    happy: 0,
    sad: 0,
    tired: 0,
    excited: 0,
  });

  const handleMoodPress = (moodKey) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [moodKey]: prevCounts[moodKey] + 1,
    }));
  };

  const handleReset = () => {
    setCounts({
      happy: 0,
      sad: 0,
      tired: 0,
      excited: 0,
    });
  };

  const maxCount = Math.max(...Object.values(counts));

  const renderCountCard = (moodKey, label, emoji) => {
    const count = counts[moodKey];
    const isTopMood = count > 0 && count === maxCount;

    return (
      <View
        key={moodKey}
        style={[
          styles.countCard,
          isTopMood && styles.topMoodCard,
        ]}
      >
        <Text style={styles.cardEmoji}>{emoji}</Text>
        <Text style={[styles.cardLabel, isTopMood && styles.topMoodText]}>{label}</Text>
        <Text style={[styles.cardCount, isTopMood && styles.topMoodCount]}>{count}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Mood Tracker</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>

        <View style={styles.buttonsContainer}>
          <MoodButton
            emoji="😊"
            label="Happy"
            onPress={() => handleMoodPress('happy')}
          />
          <MoodButton
            emoji="😢"
            label="Sad"
            onPress={() => handleMoodPress('sad')}
          />
          <MoodButton
            emoji="😴"
            label="Tired"
            onPress={() => handleMoodPress('tired')}
          />
          <MoodButton
            emoji="🤩"
            label="Excited"
            onPress={() => handleMoodPress('excited')}
          />
        </View>

        <Text style={styles.sectionTitle}>Logged Moods</Text>
        <View style={styles.countsContainer}>
          {renderCountCard('happy', 'Happy', '😊')}
          {renderCountCard('sad', 'Sad', '😢')}
          {renderCountCard('tired', 'Tired', '😴')}
          {renderCountCard('excited', 'Excited', '🤩')}
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reset All Counts</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#334155',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  countsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  countCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    width: '47%',
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  cardCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 2,
  },
  topMoodCard: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderWidth: 2,
    transform: [{ scale: 1.03 }],
  },
  topMoodText: {
    color: '#4338CA',
    fontWeight: '700',
  },
  topMoodCount: {
    fontSize: 28,
    color: '#4338CA',
  },
  resetButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  resetText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
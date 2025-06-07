import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Animated,
} from 'react-native';

const CounterScreen = () => {
  const [rowCount, setRowCount] = useState(0);
  const [targetRows, setTargetRows] = useState(10);
  const spinValue = new Animated.Value(0);

  const addRow = () => {
    setRowCount(prev => prev + 1);
    animateCounter();
    Vibration.vibrate(50);
  };

  const subtractRow = () => {
    if (rowCount > 0) {
      setRowCount(prev => prev - 1);
      Vibration.vibrate(50);
    }
  };

  const resetCounter = () => {
    setRowCount(0);
    Vibration.vibrate(100);
  };

  const animateCounter = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressPercent = Math.min(100, (rowCount / targetRows) * 100);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>KnitClick</Text>
      <Text style={styles.tagline}>One by one, knitting is fun!</Text>

      {/* Add Row Button */}
      <TouchableOpacity style={styles.addButton} onPress={addRow}>
        <Text style={styles.addButtonText}>+ Add Row</Text>
      </TouchableOpacity>

      {/* Circular Counter */}
      <Animated.View style={[styles.counter, { transform: [{ rotate: spin }] }]}>
        <Text style={styles.countText}>{rowCount}</Text>
      </Animated.View>

      {/* Secondary Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={subtractRow}>
          <Text style={styles.secondaryButtonText}>- 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={resetCounter}>
          <Text style={styles.secondaryButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>Progress: {rowCount} / {targetRows} rows</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4f6',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#daa5ba',
    marginTop: 60,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#c4949f',
    marginBottom: 30,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#daa5ba',
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  counter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#daa5ba',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  countText: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#e8dde0',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#5a4a52',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  progressSection: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(218, 165, 186, 0.1)',
    borderRadius: 25,
  },
  progressText: {
    fontSize: 14,
    color: '#5a4a52',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(218, 165, 186, 0.2)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#daa5ba',
    borderRadius: 20,
  },
});

export default CounterScreen;
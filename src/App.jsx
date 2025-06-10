import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Vibration,
  Animated,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KnitClick = () => {
  const [count, setCount] = useState(0);
  const rotationValue = useRef(new Animated.Value(0)).current;
  const numberRotationValue = useRef(new Animated.Value(0)).current;

  // Load saved count on app start
  useEffect(() => {
    loadCount();
  }, []);

  // Save count whenever it changes
  useEffect(() => {
    saveCount();
  }, [count]);

  const loadCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem('knitClickCount');
      if (savedCount !== null) {
        setCount(parseInt(savedCount));
      }
    } catch (error) {
      console.log('Error loading count:', error);
    }
  };

  const saveCount = async () => {
    try {
      await AsyncStorage.setItem('knitClickCount', count.toString());
    } catch (error) {
      console.log('Error saving count:', error);
    }
  };

  const incrementCount = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Vibration.vibrate(50);
    } else {
      Vibration.vibrate(50);
    }

    // Update count
    setCount(prevCount => prevCount + 1);

    // Spin animation - circle spins 360 degrees, number spins with it
    const currentRotation = rotationValue._value;
    const newRotation = currentRotation + 360;

    Animated.timing(rotationValue, {
      toValue: newRotation,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(numberRotationValue, {
      toValue: newRotation,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const resetCount = () => {
    setCount(0);
    // Reset rotation values
    rotationValue.setValue(0);
    numberRotationValue.setValue(0);
  };

  const circleRotation = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const numberRotation = numberRotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>KnitClick</Text>
      </View>

      {/* Counter Display */}
      <View style={styles.counterContainer}>
        <Animated.View 
          style={[
            styles.counterCircle,
            { transform: [{ rotate: circleRotation }] }
          ]}
        >
          <Animated.Text 
            style={[
              styles.countDisplay,
              { transform: [{ rotate: numberRotation }] }
            ]}
          >
            {count}
          </Animated.Text>
        </Animated.View>
        
        {/* Stationary white pin */}
        <View style={styles.whitePin} />
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.decrementButton}
          onPress={decrementCount}
          disabled={count === 0}
          activeOpacity={0.7}
        >
          <Text style={styles.decrementButtonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.incrementButton}
          onPress={incrementCount}
          activeOpacity={0.7}
        >
          <Text style={styles.incrementButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetCount} activeOpacity={0.7}>
        <Text style={styles.resetButtonText}>Reset Counter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d4b5bb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b08a93',
    textAlign: 'center',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  counterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    shadowColor: '#b08a93',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 8,
    borderColor: '#d4b5bb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  countDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7a5c68',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  whitePin: {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transform: [{ translateX: -3 }, { translateY: 80 }],
    width: 6,
    height: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b08a93',
    borderRadius: 2,
    shadowColor: '#b08a93',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#b08a93',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#b08a93',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  incrementButtonText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  decrementButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#b08a93',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#b08a93',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  decrementButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b08a93',
  },
  resetButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b08a93',
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
    shadowColor: '#b08a93',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resetButtonText: {
    color: '#b08a93',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default KnitClick;

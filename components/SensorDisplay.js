import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Accelerometer, Gyroscope, Magnetometer, Barometer, Pedometer, MagnetometerUncalibrated, LightSensor  } from 'expo-sensors';

const SensorDisplay = () => {
  const [accelerometerData, setAccelerometerData] = useState({});
  const [gyroscopeData, setGyroscopeData] = useState({});
  const [magnetometerData, setMagnetometerData] = useState({});
  const [barometerData, setBarometerData] = useState({});
  const [stepCount, setStepCount] = useState(0);
  const [magnetometerUncalibratedData, setMagnetometerUncalibratedData] = useState({});
      const [{ illuminance }, setData] = useState({ illuminance: 0 });

  useEffect(() => {
    // Accelerometer
    Accelerometer.addListener((data) => {
      setAccelerometerData(data);
    });

    // Gyroscope
    Gyroscope.addListener((data) => {
      setGyroscopeData(data);
    });

    // Magnetometer
    Magnetometer.addListener((data) => {
      setMagnetometerData(data);
    });

      Barometer.addListener((data) => {
    setBarometerData(data);
  });
    const subscription = Pedometer.watchStepCount((result) => {
    setStepCount(result.steps);
  });

    MagnetometerUncalibrated.addListener((data) => {
    setMagnetometerUncalibratedData(data);
  });

    // Clean up listeners on component unmount
    return () => {
      Accelerometer.removeAllListeners();
      Gyroscope.removeAllListeners();
      Magnetometer.removeAllListeners();
      Barometer.removeAllListeners();
      subscription && subscription.remove();
      MagnetometerUncalibrated.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, [_toggle]);

  const _toggle = useCallback( () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  }, []);

  const _subscribe = () => {
    this._subscription = LightSensor.addListener(setData);
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <View>
      <Text>Accelerometer Data: {JSON.stringify(accelerometerData)}</Text>
      <Text>Gyroscope Data: {JSON.stringify(gyroscopeData)}</Text>
      <Text>Magnetometer Data: {JSON.stringify(magnetometerData)}</Text>
      <Text>Barometer Data: {JSON.stringify(barometerData)}</Text>
      <Text>Step Count: {stepCount}</Text>
      <Text>Magnetometer Uncalibrated Data: {JSON.stringify(magnetometerUncalibratedData)}</Text>
          <View>
      <Text>Light Sensor:</Text>
      <Text>
        Illuminance: {Platform.OS === 'android' ? `${illuminance} lx` : `Only available on Android`}
      </Text>
      <View >
        <TouchableOpacity onPress={_toggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default SensorDisplay;


import { StyleSheet, View } from 'react-native';
import SensorDisplay from './components/SensorDisplay';

export default function App() {
  return (
    <View style={styles.container}>
      <SensorDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

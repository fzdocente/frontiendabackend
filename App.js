import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeCustomers from './components/HomeCustomers';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeCustomers} options={{title:'Sistema de Inventario'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Customer from './Customer';
import ListCustomers from './ListCustomers';
import {MaterialIcons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function HomeCustomers() {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarActiveBackgroundColor:'orange'
        }}

        >
      <Tab.Screen name="Customer" component={Customer} options={{
        title:'Cliente',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="account-circle" color="red" size={25} />
        )
      }} />
      <Tab.Screen name="List" component={ListCustomers} options={{
        title:'Listado de Clientes',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="view-list" color="blue" size={25} />
        )
      }}/>
    </Tab.Navigator>
  );
}


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onboarding from './src/components/Home/Onboarding';
import Welcome from './src/components/Home/Welcome';
import Register from './src/components/Home/Register';
import Login from './src/components/Home/Login';
import Home from './src/components/Home/Home';
import About from './src/components/About';
// import ProfileScreen from './src/components/Profile';
import CustomDrawerContent from './src/components/CustomDrawerContent'; // Đảm bảo đường dẫn chính xác

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Dùng prop drawerContent để render
      screenOptions={{
        headerShown: false, 
        drawerType: 'back',
      }}
    >
      <Drawer.Screen name="Thuê xe" component={Home} />
      <Drawer.Screen name="Mua xe" component={Welcome} />
      <Drawer.Screen name="Xe yêu thích" component={Welcome} />
      <Drawer.Screen name="Lịch sử" component={Welcome} />
      <Drawer.Screen name="Chat với cửa hàng" component={Welcome} />
      <Drawer.Screen name="Thông tin cửa hàng" component={About} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

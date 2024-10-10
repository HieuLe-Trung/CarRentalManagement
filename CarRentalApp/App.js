import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onboarding from './src/components/Home/Onboarding';
import Welcome from './src/components/Home/Welcome';
import Register from './src/components/Home/Register';
import Login from './src/components/Home/Login';
import Home from './src/components/Home/Home';
import HomeEmp from './src/components/Employee/HomeEmp.js';
import About from './src/components/About';
import CarBrandManagement from './src/components/Employee/CarBrandManagement';
import SaleCarManagement from './src/components/Employee/SaleCarManagement';
import RentCarManagement from './src/components/Employee/RentCarManagement';
import CarDetail from './src/components/CarDetail';
import CarList from './src/components/CarList';
import FavoriteCars from './src/components/FavoriteCars'
import CarRentalRequest from './src/components/CarRentalRequest'



// import SaleCar from './src/components/SaleCar';
import DatePickerComponent from './src/components/DatePickerComponent';
import Profile from './src/components/Home/Profile';
import CustomDrawerContent from './src/components/CustomDrawerContent'; 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = ({ route }) => {
  const { token } = route.params;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} token={token} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
      }}
    >
      <Drawer.Screen name="Home" component={Home} initialParams={{ token }} />
      <Drawer.Screen name="Thuê xe" component={Home} initialParams={{ token }} />
      <Drawer.Screen name="Mua xe" component={Welcome} />
      <Drawer.Screen name="Xe yêu thích" component={FavoriteCars} initialParams={{ token }} />
      <Drawer.Screen name="Lịch sử" component={Welcome} initialParams={{ token }} />
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
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="DatePickerComponent" component={DatePickerComponent} options={{ headerShown: false }} />
        <Stack.Screen name="HomeEmp" component={HomeEmp} options={{ headerShown: false }} />
        <Stack.Screen name="CarBrandManagement" component={CarBrandManagement} options={{ headerShown: false }} />
        <Stack.Screen name="SaleCarManagement" component={SaleCarManagement} options={{ headerShown: false }} />
        <Stack.Screen name="RentCarManagement" component={RentCarManagement} options={{ headerShown: false }} />
        <Stack.Screen name="CarDetail" component={CarDetail} options={{ headerShown: false }} />
        <Stack.Screen name="CarList" component={CarList} options={{ headerShown: false }} />
        <Stack.Screen name="FavoriteCars" component={FavoriteCars} options={{ headerShown: false }} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="CarRentalRequest" component={CarRentalRequest} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

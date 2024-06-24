import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import home from '../../styles/home.js'
const Home = ({navigation}) => {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };
    return (
        <View style={home.container}>
            <Image
                source={require('../../assets/images/HomeCar.jpg')}
                style={home.background}
            ></Image>
            <Text style={home.welcome}>
                <Text>Welcome to </Text>
                <Text style={home.welcomePart1}>HCarRental</Text>
            </Text>
            <Text style={home.welcomeChild}>Ứng dụng thuê xe của chúng tôi sẽ giúp bạn dễ dàng tìm và đặt chiếc xe lý tưởng cho mọi chuyến đi của bạn, mang đến trải nghiệm di chuyển thuận tiện và thú vị.</Text>
            <TouchableOpacity style={home.button} onPress={handleRegisterPress}><Text style={home.buttonText} >Tạo tài khoản</Text></TouchableOpacity>
            <TouchableOpacity style={[home.button, { backgroundColor: 'white' }]} onPress={handleLoginPress}><Text  style={[home.buttonText, { color: '#1e90ff' }]}>Đăng nhập</Text></TouchableOpacity>
        </View>

    );
};
export default Home;
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import welcome from '../../styles/welcome.js'
const Welcome = ({ navigation }) => {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };
    return (
        <View style={welcome.container}>
            <Image
                source={require('../../assets/images/HomeCar.jpg')}
                style={welcome.background}
            ></Image>
            <Text style={welcome.welcome}>
                <Text>Welcome to </Text>
                <Text style={welcome.welcomePart1}>HCarRental</Text>
            </Text>
            <Text style={welcome.welcomeChild}>Ứng dụng thuê xe của chúng tôi sẽ giúp bạn dễ dàng tìm và đặt chiếc xe lý tưởng cho mọi chuyến đi của bạn, mang đến trải nghiệm di chuyển thuận tiện và thú vị.</Text>
            <TouchableOpacity style={welcome.button} onPress={handleRegisterPress}><Text style={welcome.buttonText} >Tạo tài khoản</Text></TouchableOpacity>
            <TouchableOpacity style={[welcome.button, { backgroundColor: 'white' }]} onPress={handleLoginPress}><Text style={[welcome.buttonText, { color: '#1e90ff' }]}>Đăng nhập</Text></TouchableOpacity>
        </View>

    );
};
export default Welcome;
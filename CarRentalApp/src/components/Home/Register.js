import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import home from "../../styles/home";
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Register = ({ navigation }) => {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const handleRegisterPress = () => {
        navigation.navigate('Login');
    };
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={home.containerSign}>
                <Image
                    source={require('../../assets/images/rollroyce2.jpg')}
                    style={[home.background, { borderBottomLeftRadius: 50, height: '30%' }]}
                ></Image>
                <Text style={home.textSign}>Đăng ký</Text>
                <Text style={home.textSignChild}>Tạo tài khoản của bạn</Text>
                <View style={home.inputContainer}>
                    <Icon name="user" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Username"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={home.inputContainer}>
                    <Icon name="phone" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Số điện thoại"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={home.inputContainer}>
                    <Icon name="envelope" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Địa chỉ email"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={home.inputContainer}>
                    <Icon name="lock" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                    />
                </View>
                <View style={home.inputContainer}>
                    <Icon name="lock" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Nhập lại Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={home.buttonSign}>
                    <Text style={home.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
                <Text style={[home.textHaventAcc, { bottom: -40 }]}>Bạn đã có tài khoản?
                    <TouchableOpacity onPress={handleRegisterPress}>
                        <Text style={home.textLogin}> Đăng nhập </Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </TouchableWithoutFeedback >

    );
}
export default Register;
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import home from "../../styles/home";
import React from 'react';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const handleLoginPress = () => {
        navigation.navigate('Register');
    };
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={home.containerSign}>
                <Image
                    source={require('../../assets/images/rollroyce.jpg')}
                    style={[home.background, { borderBottomLeftRadius: 50, height: '34%' }]}
                ></Image>
                <Text style={home.textSign}>Đăng nhập</Text>
                <Text style={home.textSignChild}>Đăng nhập với tài khoản của bạn</Text>
                <View style={home.inputContainer}>
                    <Icon name="user" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Username"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={home.inputContainer}>
                    <Icon name="lock" size={20} color="#888" style={home.icon} />
                    <TextInput
                        style={home.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={isPasswordSecure}
                    />
                    <Icon
                        onPress={() => setIsPasswordSecure(prev => !prev)} 
                        name={isPasswordSecure ? 'eye' : 'eye-slash'} 
                        size={20}
                        color="#888"
                        style={home.icon}
                    />
                </View>
                <Text style={home.or}>Hoặc</Text>
                <TouchableOpacity style={home.buttonSign}>
                    <Text style={home.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[home.buttonSign, { bottom: -110, minWidth: '80%', backgroundColor: '#483d8b' }]}>
                    <Text style={home.buttonText}>Đăng nhập với ADMIN</Text>
                </TouchableOpacity>
                <Text style={home.textHaventAcc}>Bạn chưa có tài khoản?
                    <TouchableOpacity onPress={handleLoginPress}>
                        <Text style={home.textLogin}> Đăng ký </Text>
                    </TouchableOpacity>
                </Text>

            </View>
        </TouchableWithoutFeedback >

    );
}
export default Login;
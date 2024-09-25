import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert, StyleSheet } from "react-native";
import welcome from "../../styles/welcome";
import React from 'react';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };
    const handleLoginPress = async () => {
        if (!username || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
            return;
        }

        try {
            const response = await fetch('http://192.168.1.5:8000/o/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                    grant_type: 'password',
                    client_id: '9j6dUaEdBDMrkGrwmddWDYjWOjIdFX0k5RgTqG24', 
                    client_secret: 'mDFYWH0TkmdJDpT1h7gl6dz3PDDaqgbjVNfYWUynr8RDmPYb1sreQSRZLDAbXzKa4hbIp7v66eMLe1s9V7rhe4e6uEVxkxIcf8WzOXpTGPEbAsvNkSM9BHn2tXQdldcM',
                }).toString()
            });

            const data = await response.json();
            if (response.ok) {
                navigation.navigate('HomeDrawer', { screen: 'Home' });
            } else {
                Alert.alert("Lỗi", "Sai username hoặc mật khẩu");
            }
        } catch (error) {
            console.error("Lỗi trong quá trình đăng nhập:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình đăng nhập.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={welcome.containerSign}>
                <Image
                    source={require('../../assets/images/rollroyce.jpg')}
                    style={[welcome.background, { borderBottomLeftRadius: 50, height: '34%' }]}
                ></Image>
                <Text style={welcome.textSign}>Đăng nhập</Text>
                <Text style={welcome.textSignChild}>Đăng nhập với tài khoản của bạn</Text>
                <View style={welcome.inputContainer}>
                    <Icon name="user" size={20} color="#888" style={welcome.icon} />
                    <TextInput
                        style={welcome.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={welcome.inputContainer}>
                    <Icon name="lock" size={20} color="#888" style={welcome.icon} />
                    <TextInput
                        style={welcome.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={isPasswordSecure}
                    />
                    <Icon
                        onPress={() => setIsPasswordSecure(prev => !prev)} 
                        name={isPasswordSecure ? 'eye' : 'eye-slash'} 
                        size={20}
                        color="#888"
                        style={welcome.icon}
                    />
                </View>
                <Text style={welcome.or}>Hoặc</Text>
                <TouchableOpacity style={welcome.buttonSign} onPress={handleLoginPress}>
                    <Text style={welcome.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[welcome.buttonSign, { bottom: -110, minWidth: '80%', backgroundColor: '#483d8b' }]}>
                    <Text style={welcome.buttonText}>Đăng nhập với ADMIN</Text>
                </TouchableOpacity>
                <Text style={welcome.textHaventAcc}>Bạn chưa có tài khoản?
                    <TouchableOpacity onPress={handleRegisterPress}>
                        <Text style={welcome.textLogin}> Đăng ký </Text>
                    </TouchableOpacity>
                </Text>

            </View>
        </TouchableWithoutFeedback >

    );
}
export default Login;
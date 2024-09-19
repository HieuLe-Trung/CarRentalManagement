import { View, Text, Image, Platform, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import welcome from "../../styles/welcome";
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleRegisterPress = async () => {
        if (!username || !phone || !email || !password || !confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Lỗi', 'Địa chỉ email không hợp lệ.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu không khớp.');
            return;
        }

        setIsLoading(true);
        console.log({ username, phone, email, password });
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('password', password);

        const response = await fetch('http://192.168.1.5:8000/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });
            const data = await response.json();
            if (response.ok) {
                setIsLoading(false);
                navigation.navigate('Home');
            } else {
                if (data.email && data.email.length > 0) {
                    errorMessage = data.email[0];
                } else if (data.phone && data.phone.length > 0) {
                    errorMessage = data.phone[0];
                } else if (data.username && data.username.length > 0) {
                    errorMessage = data.username[0];
                }
                console.log('Error from API:', data);
                setIsLoading(false);
                Alert.alert('Lỗi', 'Đăng ký thất bại.');
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại.');
            console.error('Network error:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={welcome.containerSign}>
                        <Image
                            source={require('../../assets/images/rollroyce2.jpg')}
                            style={[welcome.background, { borderBottomLeftRadius: 50, height: '30%' }]}
                        />
                        <Text style={welcome.textSign}>Đăng ký</Text>
                        <Text style={welcome.textSignChild}>Tạo tài khoản của bạn</Text>

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
                            <Icon name="phone" size={20} color="#888" style={welcome.icon} />
                            <TextInput
                                style={welcome.input}
                                placeholder="Số điện thoại"
                                value={phone}
                                onChangeText={setPhone}
                                placeholderTextColor="#888"
                            />
                        </View>

                        <View style={welcome.inputContainer}>
                            <Icon name="envelope" size={20} color="#888" style={welcome.icon} />
                            <TextInput
                                style={welcome.input}
                                placeholder="Địa chỉ email"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="#888"
                            />
                        </View>

                        <View style={welcome.inputContainer}>
                            <Icon name="lock" size={20} color="#888" style={welcome.icon} />
                            <TextInput
                                style={welcome.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor="#888"
                                secureTextEntry
                            />
                        </View>

                        <View style={welcome.inputContainer}>
                            <Icon name="lock" size={20} color="#888" style={welcome.icon} />
                            <TextInput
                                style={welcome.input}
                                placeholder="Nhập lại Password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholderTextColor="#888"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={welcome.buttonSign} onPress={handleRegisterPress}>
                            <Text style={welcome.buttonText}>Đăng ký</Text>
                        </TouchableOpacity>

                        <Text style={[welcome.textHaventAcc, { bottom: -40 }]}>Bạn đã có tài khoản?
                            <TouchableOpacity onPress={handleLoginPress}>
                                <Text style={welcome.textLogin}> Đăng nhập </Text>
                            </TouchableOpacity>
                        </Text>

                        {isLoading && (
                            <View style={welcome.loaderContainer}>
                                <ActivityIndicator size="large" color="#0000ff" style={welcome.loader} />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Register;

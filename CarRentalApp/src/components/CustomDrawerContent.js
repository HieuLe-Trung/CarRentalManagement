import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 

const CustomDrawerContent = ({ token, navigation, ...props }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const handleLogout = () => {
    navigation.navigate('Login');
    setTimeout(() => {
      Alert.alert("Thông báo", "Đăng xuất thành công");
    }, 100);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true); 
      try {
        const response = await axios.get(`${baseURL}user/current_user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { token })}>
        <View style={styles.userInfoContainer}>
        <Image source={userProfile && userProfile.avatar ? { uri: userProfile.avatar } : require('../assets/images/man.png')} style={styles.avatar} />
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <Text style={styles.userName}>{userProfile ? `${userProfile.username} ` : 'Người dùng'}</Text>
              <Text style={styles.userEmail}>{userProfile ? userProfile.email : 'email@example.com'}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      {/* Các mục trong Drawer */}
      {[
        { label: 'Thuê xe', icon: 'car', route: 'Thuê xe' },
        { label: 'Mua xe', icon: 'shopping-cart', route: 'Mua xe' },
        { label: 'Xe yêu thích', icon: 'heart', route: 'Xe yêu thích' },
        { label: 'Lịch sử', icon: 'history', route: 'Lịch sử' },
        { label: 'Chat với cửa hàng', icon: 'comments', route: 'Chat với cửa hàng' },
        { label: 'Thông tin cửa hàng', icon: 'info-circle', route: 'Thông tin cửa hàng' },
      ].map((item, index) => (
        <DrawerItem
          key={index}
          label={item.label}
          icon={() => <Icon name={item.icon} size={20} color="#000" />}
          onPress={() => navigation.navigate(item.route)}
        />
      ))}

      {/* Nút Đăng xuất */}
      <DrawerItem
        label="Đăng Xuất"
        icon={() => <Icon name="sign-out" size={20} color="#fff" />}
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={styles.logoutLabel}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF4D4D',
    borderRadius: 5,
  },
  logoutLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;

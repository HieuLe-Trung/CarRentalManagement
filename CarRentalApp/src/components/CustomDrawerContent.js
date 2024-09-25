import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thêm icon

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    alert('Đăng xuất thành công!');
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
        <View style={styles.userInfoContainer}>
          <Image source={require('../assets/images/man.png')} style={styles.avatar} />
          <Text style={styles.userName}>Lê Trung Hiếu</Text>
          <Text style={styles.userEmail}>mtrunghieu12@gmail.com</Text>
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
          onPress={() => props.navigation.navigate(item.route)}
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

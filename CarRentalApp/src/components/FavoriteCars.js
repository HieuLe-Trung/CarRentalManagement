import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';  // Hook để truy cập navigation và focus effect
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import CarList from './CarList'; // Đảm bảo bạn import CarList đúng cách

const API_URL = 'http://192.168.1.17:8000/favorite-rent-cars/';

const FavoriteCarsScreen = ({ route }) => {
  const { token } = route.params;
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation(); // Hook navigation

  const getFavoriteCars = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cars = response.data;

      if (Array.isArray(cars) && cars.length > 0) {
        setCarList(cars);
      } else {
        setError('Không có xe yêu thích.');
      }
    } catch (err) {
      console.error('Lỗi chi tiết khi lấy dữ liệu xe yêu thích:', err.response ? err.response.data : err.message);
      setError('Lỗi khi lấy dữ liệu xe yêu thích.');
    } finally {
      setLoading(false);
    }
  };

  // Đảm bảo gọi lại API khi màn hình nhận focus hoặc token thay đổi
  useFocusEffect(
    React.useCallback(() => {
      getFavoriteCars();
    }, [token])  // Phụ thuộc vào token hoặc các dữ liệu cần thiết khác
  );

  const filteredCars = carList.map(item => item.rent_car); // Lọc dữ liệu xe yêu thích từ carList

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Dòng chữ "Danh sách xe yêu thích" */}
      <Text style={styles.headerText}>Danh sách xe yêu thích</Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <CarList cars={filteredCars} isForSale={false} token={token} />
      )}

      {/* Nút back ở góc trái */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:33,
    color:'#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
});

export default FavoriteCarsScreen;

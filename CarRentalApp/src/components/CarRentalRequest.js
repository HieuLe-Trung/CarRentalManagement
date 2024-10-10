import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CarRentalRequest = ({ route, navigation }) => {
  const { carId, startDate, endDate, token } = route.params;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.17:8000/rent-car/${carId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const carData = await response.json();
        setCar(carData);
      } else {
        Alert.alert('Lỗi', 'Không thể tải thông tin xe. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error loading car details:', error);
      Alert.alert('Lỗi', 'Không thể kết nối với server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);

  const calculateRentalDetails = () => {
    const timeDiff = Math.abs(end - start);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const rentalPrice = diffDays * car?.price_per_day || 0; // Make sure car details are available
    const deposit = rentalPrice * 0.3;
    const paymentOnPickup = rentalPrice * 0.7;

    return {
      rentalPrice,
      deposit,
      paymentOnPickup,
      diffDays,
    };
  };

  const handleRequestRent = async () => {
    const { rentalPrice, deposit, paymentOnPickup, diffDays } = calculateRentalDetails();

    const rentalData = {
      rent_car_id: carId,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      total_rental_price: rentalPrice,
    };

    try {
      const response = await fetch('http://192.168.1.17:8000/rental/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(rentalData),
      });

      const responseData = await response.json(); // Parse the JSON response

      if (response.ok) {
        Alert.alert('Yêu cầu thuê xe đã được gửi!');
      } else {
        console.error('API Error:', responseData);
        Alert.alert('Lỗi', responseData.message || 'Không thể gửi yêu cầu thuê xe. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error sending rental request:', error);
      Alert.alert('Lỗi', 'Không thể gửi yêu cầu thuê xe. Vui lòng thử lại sau.');
    }
  };
  
  
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải thông tin xe...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={32} color="black" />
      </TouchableOpacity>

      <Image source={{ uri: car.images[0].image }} style={styles.carImage} />

      <Text style={styles.carName}>{car.name}</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Ngày nhận xe: </Text>
        <Text style={styles.dateText}>{start.toLocaleDateString()}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Ngày trả xe: </Text>
        <Text style={styles.dateText}>{end.toLocaleDateString()}</Text>
      </View>

      <View style={styles.rentalInfo}>
        <Text style={styles.rentalText}>Giá thuê mỗi ngày: {car.price_per_day.toLocaleString()} VND</Text>
        <Text style={styles.rentalText}>Số ngày thuê: {calculateRentalDetails().diffDays} ngày</Text>
        <Text style={styles.rentalText}>Giá thuê tổng cộng: {calculateRentalDetails().rentalPrice.toLocaleString()} VND</Text>
        <Text style={styles.rentalText}>Tiền cọc (30%): {calculateRentalDetails().deposit.toLocaleString()} VND</Text>
        <Text style={styles.rentalText}>Thanh toán khi nhận xe (70%): {calculateRentalDetails().paymentOnPickup.toLocaleString()} VND</Text>
      </View>

      <TouchableOpacity style={styles.rentButton} onPress={handleRequestRent}>
        <Text style={styles.buttonText}>Gửi yêu cầu thuê xe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Các style cho màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6c757d',
  },
  carImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  carName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#212529',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  dateLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#495057',
  },
  dateText: {
    fontSize: 16,
    color: '#343a40',
  },
  rentalInfo: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rentalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
  },
  rentButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default CarRentalRequest;

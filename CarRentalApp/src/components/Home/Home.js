import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [carBrands, setCarBrands] = useState([]);
  const [cars, setCars] = useState([]);
  

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await fetch('http://192.168.1.5:8000/categories/');
        const data = await response.json();
        setCarBrands(data); 
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchCarBrands(); 
  }, []);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:8000/rent-car/');
        setCars(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Menu mở ra!')}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/Logo.png') }
            style={styles.logo}
          />
        </View>

        <TouchableOpacity style={styles.searchContainer} onPress={() => alert('Tìm xe!')}>
          <Icon name="search" size={24} color="#000" />
          <Text style={styles.searchText}>Tìm xe</Text>
        </TouchableOpacity>
      </View>
      {/* Chọn thời gian thuê */}
      
      {/* Danh sách các hãng xe */}
      <View style={styles.container}>
        <FlatList
          data={carBrands}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.brandItem} onPress={() => alert(`Bạn đã chọn: ${item.name}`)}>
              <Image
                source={{ uri: `https://res.cloudinary.com/djkg7qktn/${item.image}` }}
                style={styles.brandImage}
              />
              <Text style={styles.brandText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* danh sách xe */}
      <FlatList
      data={cars}
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>Phiên bản: {item.model}</Text>
          <Text>Fuel Type: {item.fuel_type}</Text>
          <Text>Transmission: {item.transmission}</Text>
          <Text>Seats: {item.seats}</Text>
          <Text>Color: {item.color}</Text>
          <Text>Year: {item.year}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Price per Day:{item.price_per_day} Triệu</Text>
          <Text>Mileage: {item.mileage} km</Text>
          <Text>Status: {item.status}</Text>
        </View>
      )}
    />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',  
      },
      logoContainer: {
        flex: 1,
        alignItems: 'center', 
      },
      logo: {
        marginStart:55,
        width: 110,
        height: 45,
        resizeMode: 'cover', 
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#000',
      },
  container: {
    height:95,
    padding:10,
    backgroundColor: '#f0fff0'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandItem: {
    alignItems: 'center',
    marginRight: 20,
    
  },
  brandImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  brandText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;

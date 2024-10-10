import { baseURL } from '../../config';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import CarList from '../CarList';

const Home = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [carBrands, setCarBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [token, setToken] = useState(route.params.token);
  const [noCarsMessage, setNoCarsMessage] = useState(''); // State để lưu thông báo khi không có xe
  const [searchQuery, setSearchQuery] = useState(''); // Thanh tìm kiếm
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await fetch(`${baseURL}categories/`);
        const data = await response.json();
        setCarBrands(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${baseURL}rent-car/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarBrands();
    fetchCars();
  }, []);

  const filterCarsByBrand = (brandId) => {
    const filtered = cars.filter(car => car.category === brandId);

    if (filtered.length > 0) {
      setFilteredCars(filtered);
      setNoCarsMessage(''); 
    } else {
      setFilteredCars([]); 
      setNoCarsMessage(`Không có xe thuộc hãng ${carBrands.find(brand => brand.id === brandId)?.name}`); 
    }

    setSelectedBrandId(brandId);
  };
  
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
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>

          <TouchableOpacity style={styles.searchContainer} onPress={() => navigation.navigate('DatePickerComponent', { token, mode:'list' })}>
            <Icon name="search" size={24} color="#000" />
            <Text style={styles.searchText}>Tìm xe</Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách các hãng xe */}
        <View style={styles.container}>
          <FlatList
            data={carBrands}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.brandItem,
                  selectedBrandId === item.id && styles.selectedBrandItem
                ]}
                onPress={() => filterCarsByBrand(item.id)}
              >
                <Image
                  source={{ uri: `https://res.cloudinary.com/djkg7qktn/${item.image}` }}
                  style={styles.brandImage}
                />
                <Text style={styles.brandText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Hiển thị thông báo nếu không có xe thuộc hãng được chọn */}
        {noCarsMessage ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ color: 'red', fontSize: 16 }}>{noCarsMessage}</Text>
          </View>
        ) : null}

        {/* Danh sách xe */}
        {filteredCars.length > 0 ? (
          <View style={{ flex: 1, padding: 10 }}>
            <CarList cars={filteredCars} isForSale={false} token={token} />
          </View>
        ) : null}
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
    marginStart: 25,
    width: 110,
    height: 45,
    resizeMode: 'cover',
  },
  container: {
    height: 95,
    padding: 10,
    backgroundColor: '#f0fff0',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandItem: {
    alignItems: 'center',
    marginRight: 20,
    padding: 5,
  },
  selectedBrandItem: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 5,
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
});

export default Home;

import React,{useState} from 'react';
import { baseURL } from '../config';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const CarItem = ({ car,isForSale, token}) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(car.liked);
  const formatPrice = (price) => {
    if (price >= 1_000_000) {
      return `${(price / 1_000_000).toFixed(1)} triệu`;
    } else if (price >= 1_000) {
      return `${(price / 1_000).toFixed(1)} K`;
    }
    return `${price} VNĐ`;
  };
  const onFavoriteToggle = async () => {
    const url = `${baseURL}rent-car/${car.id}/like/`; 
    try {
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }); 
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const onCarPress = () => {
    navigation.navigate('CarDetail', { carId: car.id, token });
  };
  return (
    <TouchableOpacity onPress={onCarPress}>
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
      <Image
        source={{ uri: car.images?.[0]?.image }} 
        style={styles.carImage}
      />
        <TouchableOpacity style={styles.heartIcon} onPress={onFavoriteToggle}>
          <Icon name="heart-o" size={24} color={isLiked ? '#f00' : '#000'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.transmissionContainer}>
            <Text style={styles.transmission}>{car.transmission}</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>Giao xe tận nơi</Text>
          </View>
        </View>
        <View style={styles.carDetails}>
          <Text style={styles.carName}>{car.name}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.footerContainer}>
          <View style={styles.ratingAndTrips}>
            <Icon name="star" size={16} color="#ffd700" />
            <Text style={styles.rating}>4.5</Text>
            <Icon name="suitcase" size={16} color="#999" style={styles.suitcaseIcon} />
            <Text style={styles.trips}>120 chuyến</Text>
          </View>
          <Text style={styles.price}>
            {isForSale 
              ? formatPrice(car.price) 
              : `${formatPrice(car.price_per_day)}/ngày`}
          </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderWidth: 1, 
    borderColor: '#ccc', 
  },
  imageContainer: {
    position: 'relative',
  },
  carImage: {
    width: '100%', 
    height: 270,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transmissionContainer: {
    backgroundColor: '#add8e6', 
    borderRadius: 5,
    padding: 5,
    flex: 1,
    marginRight: 5,
  },
  deliveryContainer: {
    backgroundColor: '#add8e6', 
    borderRadius: 5,
    padding: 5,
    flex: 1,
  },
  transmission: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  carDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 1,
    marginHorizontal: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingAndTrips: {
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#ffd700',
    marginLeft: 5,
  },
  suitcaseIcon: {
    marginLeft: 10,
    color:'#4CAF50'
  },
  trips: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default CarItem;

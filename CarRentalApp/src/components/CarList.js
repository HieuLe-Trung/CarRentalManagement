
import { FlatList, ActivityIndicator,TextInput, TouchableOpacity,SafeAreaView,Button, View, Text } from 'react-native';
import CarItem from '../components/CarItem';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const CarList = ({ cars, isForSale, token }) => {
  const route = useRoute(); // Sử dụng useRoute để lấy thông tin từ route
  const navigation = useNavigation(); // Sử dụng hook useNavigation
  const availableCars = route.params?.availableCars || []; // Lấy availableCars từ params, nếu có sau khi truy vấn thời gian
  const carData = cars && cars.length > 0 ? cars : availableCars;

  // Kết hợp cars từ props và availableCars từ params
  if (!carData || carData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Không có xe nào để hiển thị.</Text>
      </View>
    );
  }

const handleCarPress = (carId) => {
    navigation.navigate('CarDetail', {carId}); 
};

return (
  <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={carData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCarPress(item.id)}>
            <CarItem 
              car={item}
              isForSale={isForSale}
              token={token} 
            />
          </TouchableOpacity>
        )}
      />
  </SafeAreaView>
);
};

export default CarList;

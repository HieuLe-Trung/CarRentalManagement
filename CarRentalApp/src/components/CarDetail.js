import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { baseURL } from '../config';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CarDetail = ({ route }) => {
  const { carId, token } = route.params;
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}rent-car/${carId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCarDetails(response.data);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId, token]);

  const onFavoriteToggle = async () => {
    const url = `${baseURL}rent-car/${carDetails.id}/like/`;
    try {
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!carDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy thông tin xe.</Text>
      </View>
    );
  }
  const features = [
    { name: 'Bản đồ', icon: <Ionicons name="map-outline" size={24} color="#4CAF50" /> },
    { name: 'Camera lùi', icon: <Ionicons name="camera-reverse-outline" size={24} color="#4CAF50" /> },
    { name: 'Camera hành trình', icon: <Ionicons name="videocam-outline" size={24} color="#4CAF50" /> },
    { name: 'Cảnh báo tốc độ', icon: <Ionicons name="speedometer-outline" size={24} color="#4CAF50" /> },
    { name: 'Định vị GPS', icon: <Ionicons name="navigate-outline" size={24} color="#4CAF50" /> },
    { name: 'Lốp dự phòng', icon: <Ionicons name="cube-outline" size={24} color="#4CAF50" /> },
    { name: 'Màn hình DVD', icon: <Ionicons name="tv-outline" size={24} color="#4CAF50" /> },
    { name: 'ETC', icon: <Ionicons name="card-outline" size={24} color="#4CAF50" /> }
  ];
  let formattedPrice;
  if (carDetails.price_per_day >= 1000000) {
    const priceInMillion = (carDetails.price_per_day / 1000000).toFixed(1);
    formattedPrice = `${priceInMillion}tr`;
  } else {
    const priceInThousand = (carDetails.price_per_day / 1000).toFixed(0);
    formattedPrice = `${priceInThousand}K`;
  }
  return (
    <View style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={32} color="black" />
      </TouchableOpacity>

      {/* Biểu tượng trái tim */}
      <TouchableOpacity style={styles.heartIcon} onPress={onFavoriteToggle}>
        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={32} color={isLiked ? "red" : "black"} />
      </TouchableOpacity>

      {/* Hình ảnh với số chỉ báo ảnh */}
      <FlatList
        data={carDetails.images}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.imageCounter}>{index + 1}/{carDetails.images.length}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentImageIndex(index);
        }}
        style={{ flexGrow: 0 }}
      />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{carDetails.name}</Text>
          <View style={styles.ratingAndTrips}>
            <Icon name="star" size={16} color="#ffd700" />
            <Text style={styles.rating}>4.5</Text>
            <Icon name="suitcase" size={16} color="#999" style={styles.suitcaseIcon} />
            <Text style={styles.trips}>120 chuyến</Text>
          </View>

          {/* Bảo hiểm thuê xe */}
          <View style={styles.insuranceContainer}>
            <Icon name="shield" size={20} color="#4CAF50" />
            <Text style={styles.insuranceText}>Bảo hiểm thuê xe</Text>
          </View>
          <Text style={styles.insuranceDescription}>Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa 2.000.000 VNĐ trong trường hợp có sự cố ngoài ý muốn.</Text>

          {/* Đặc điểm xe */}
          <View style={styles.separator} />
          <Text style={styles.featuresTitle}>Đặc điểm</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Icon name="cogs" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Truyền động: {carDetails.transmission}</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="users" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Số ghế: {carDetails.seats}</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="fire" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Nhiên liệu: {carDetails.fuel_type}</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="tint" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Tiêu hao: {carDetails.fuel_consumption} L/100km</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.featuresTitle}>Mô tả</Text>
        <Text style={styles.description}>{carDetails.description}</Text>

        <View style={styles.separator} />

        <Text style={styles.featuresTitle}>Các tiện nghi trên xe</Text>
          <View style={styles.featureList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconWrapper}>
                  {feature.icon}
                </View>
                <Text style={styles.featureDescription}>{feature.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.separator} />

          {/* Mô tả chi tiết xe */}
          <View style={styles.detailsContainer}>
            

            <Text style={styles.infoHeader}>Thông tin khác:</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Model:</Text>
              <Text style={styles.infoValue}>{carDetails.model}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nhiên liệu:</Text>
              <Text style={styles.infoValue}>{carDetails.fuel_type}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số ghế:</Text>
              <Text style={styles.infoValue}>{carDetails.seats}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Màu sắc:</Text>
              <Text style={styles.infoValue}>{carDetails.color}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Năm sản xuất:</Text>
              <Text style={styles.infoValue}>{carDetails.year}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Truyền động:</Text>
              <Text style={styles.infoValue}>{carDetails.transmission}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Trạng thái:</Text>
              <Text style={styles.infoValue}>{carDetails.status}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Xuất xứ:</Text>
              <Text style={styles.infoValue}>{carDetails.origin}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tình trạng:</Text>
              <Text style={styles.infoValue}>{carDetails.condition}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Màu nội thất:</Text>
              <Text style={styles.infoValue}>{carDetails.interior_color}</Text>
            </View>
              </View>

        <View style={styles.separator} />
        
        <Text style={styles.featuresTitle}>Đánh giá</Text>
        
          <View style={styles.reviewsContainer}>
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={require('../assets/images/man.png')} style={styles.avatar} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>Nguyễn Y Khoa</Text>
                  <Text style={styles.reviewDate}>Ngày thuê: 10/10/2024</Text>
                </View>
                <View style={styles.starsContainer}>
                  <Text style={styles.starText}>⭐4</Text>
                </View>
              </View>
              <Text style={styles.reviewContent}>
                Xe sạch sẽ, dễ lái, phù hợp cho chuyến đi dài. Hướng dẫn rõ ràng và nhanh chóng.
              </Text>
            </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={require('../assets/images/girl.png')} style={styles.avatar} />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewerName}>Bùi Thị Ngân</Text>
                <Text style={styles.reviewDate}>Ngày thuê: 12/10/2024</Text>
              </View>
              <View style={styles.starsContainer}>
                <Text style={styles.starText}>⭐ 5</Text>
              </View>
            </View>
            <Text style={styles.reviewContent}>
              Xe rất mới và thoải mái. Dịch vụ cho thuê tuyệt vời, sẽ quay lại lần sau.
            </Text>
          </View>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        
        

        <View style={styles.itemContainer}>
          <Icon name="id-card" size={24} color="#4CAF50" />
          <Text style={styles.itemText}>Giấy tờ thuê xe Chọn hình thức:</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemDescription}>◦ GPLX (đối chiếu) & CCCD (đối chiếu VNeID)</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemDescription}>◦ GPLX (đối chiếu) & Passport (giữ lại)</Text>
        </View>

        <View style={styles.itemContainer}>
          <Icon name="money" size={24} color="#4CAF50" />
          <Text style={styles.itemText}>Tài sản thế chấp:</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemDescription}>Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy.</Text>
        </View>

        <View style={styles.itemContainer}>
          <Icon name="file-text" size={24} color="#4CAF50" />
          <Text style={styles.itemText}>Điều khoản:</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemDescription}>
            Quy định khác:
            {"\n"}◦ Sử dụng xe đúng mục đích.
            {"\n"}◦ Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
            {"\n"}◦ Không sử dụng xe thuê để cầm cố, thế chấp.
            {"\n"}◦ Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
            {"\n"}◦ Không chở hàng quốc cấm dễ cháy nổ.
            {"\n"}◦ Không chở hoa quả, thực phẩm nặng mùi trong xe.
            {"\n"}◦ Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.
            {"\n"}Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Icon name="credit-card" size={24} color="#4CAF50" />
          <Text style={styles.itemText}>Phụ phí có thể phát sinh:</Text>
        </View>

        <View style={{ flexDirection: 'column', paddingVertical: 10, paddingHorizontal: 16}}>
          <Text style={styles.itemDescription}>◦ Phí vượt giới hạn: 4 000đ/km</Text>
          <Text style={styles.itemDescription}>◦ Phí quá giờ: 80 000đ/h</Text>
          <Text style={styles.itemDescription}>◦ Phí vệ sinh: 100 000đ</Text>
          <Text style={styles.itemDescription}>◦ Phí khử mùi: 400 000đ</Text>
        </View>

        
      </ScrollView>
      <View style={styles.footer}>
          <Text style={styles.priceAmount}>{formattedPrice}</Text><Text>/Ngày</Text>
          <TouchableOpacity style={styles.rentButton} onPress={() => navigation.navigate('DatePickerComponent', { token: token, mode:'check', carId:carId })}>
          <Text style={styles.rentButtonText}>Chọn thuê</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding:12,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',   // Wrap các item khi cần thiết
    justifyContent: 'space-between',   // Tạo khoảng cách đều giữa các cột
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',   // Align icon và chữ vào giữa theo chiều dọc
    width: '48%',   // Mỗi card chiếm 48% chiều rộng để chia thành 2 cột
    marginBottom: 20,   // Khoảng cách giữa các item
  },
  featureIconWrapper: {
    width: 30,  // Cố định kích thước icon
    height: 30,  // Cố định kích thước icon
    marginRight: 10,  // Khoảng cách giữa icon và mô tả
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,   // Giúp text co lại nếu không đủ không gian
  },
  featuresTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  insuranceText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginLeft: 30,
    marginVertical: 5,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
    width: 80,
  },
  featureText: {
    fontSize: 12,
    marginTop:15,
    // color: '#4CAF50',
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 15,
    marginBottom: 5,
    color: '#555',
  },
  infoHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  imageContainer: {
    width: width,
    height: height * 0.35,  // Điều chỉnh kích thước cho phù hợp
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingAndTrips: {
    marginTop: 10,
    marginBottom:30,
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
    color: '#4CAF50',
  },
  trips: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  heartIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  // đánh giá
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 20,
    textAlign: 'center',
  },
  reviewsContainer: {
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  starsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 60,
  },
  starText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  reviewContent: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  viewMoreButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // giá và chọn thuê
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowOpacity: 0.1, // Độ mờ của bóng
  },
  priceAmount: {
    color: 'green', // Màu xanh cho phần giá
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10,
    marginRight:-195,
  },
  rentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  rentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CarDetail;

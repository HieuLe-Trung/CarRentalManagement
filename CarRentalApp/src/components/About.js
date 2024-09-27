import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const IntroductionScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Nút quay lại */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giới thiệu</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.introSection}>
          <Text style={styles.title}>TrungHieu Store</Text>
          <Text style={styles.description}>
            Trung Hiếu Store chuyên cung cấp dịch vụ cho thuê và bán xe cũ với chất lượng tốt nhất.
          </Text>
          <Image 
            source={require('../assets/images/Logo.png')}
            style={styles.storeImage}
          />
        </View>

        <View style={styles.missionVision}>
          <Text style={styles.subTitle}>Tầm Nhìn</Text>
          <Text style={styles.missionDescription}>
            Trở thành nền tảng hàng đầu trong lĩnh vực xe cũ tại Việt Nam bằng việc cho khách hàng trải nghiệm hoàn toàn minh bạch, tin cậy, nhanh chóng và thông tin rõ ràng. Chúng tôi cam kết sử dụng công nghệ tiên tiến và hiện đại nhất để đảm bảo quá trình mua bán xe cũ được diễn ra một cách thuận tiện và đáng tin cậy nhất.
          </Text>
          <Text style={styles.subTitle}>Sứ Mệnh</Text>
          <Text style={styles.missionDescription}>
            Trở thành lựa chọn tối ưu cho mọi nhu cầu liên quan đến xe ô tô tại Việt Nam. TrungHieu cam kết nâng tầm hệ sinh thái ô tô tại Việt Nam bằng cách thiết lập các tiêu chuẩn cao và đem lại trải nghiệm tuyệt vời cho khách hàng và đối tác của chúng tôi.
          </Text>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.subTitle}>Lịch Sử Phát Triển</Text>
          <View style={styles.historyItem}>
            <FontAwesome name="map-marker" size={24} color="#4CAF50" />
            <Text style={styles.historyText}>2015: TrungHieu Store là một trong những công ty ươm mầm khởi nghiệp lớn nhất trên thế giới.</Text>
          </View>
          <Text style={styles.dash}>—</Text>
          <View style={styles.historyItem}>
            <FontAwesome name="map-marker" size={24} color="#4CAF50" />
            <Text style={styles.historyText}>2018: SAVICO, chủ sở hữu OtoS, trở thành nhà đầu tư chiến lược cùng TrungHieu, tiếp thêm năng lực cho TrungHieu với bề dày kinh nghiệm trong xây dựng hệ thống phân phối ô tô.</Text>
          </View>
          <Text style={styles.dash}>—</Text>
          <View style={styles.historyItem}>
            <FontAwesome name="map-marker" size={24} color="#4CAF50" />
            <Text style={styles.historyText}>2020: Tập trung đẩy mạnh các dịch vụ hỗ trợ đến thẳng tay khách hàng mà không phải qua các bên trung gian.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>CÔNG TY TNHH XE CLASSIFIEDS</Text>
          <Text style={styles.footerText}>Hotline: 0348266932 </Text>
          <Text style={styles.footerText}>Liên hệ: trunghieu.store@gmail.com</Text>
          <Text style={styles.footerText}>Địa chỉ: 842 Nguyễn Kiệm, phường 3, Gò Vấp</Text>
          <Text style={styles.footerText}>Việt Nam. ©2024 by Car Classifieds Limited.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 139,
    color: '#000',
  },
  introSection: {
    marginBottom: 20,
    backgroundColor: '#BBDEFB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976D2',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 10,
  },
  storeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  missionVision: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#90CAF9',
    borderRadius: 10,
  },
  missionDescription: {
    fontSize: 16,
    color: '#0D47A1',
  },
  subTitle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D47A1',
  },
  historySection: {
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#0D47A1',
  },
  dash: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 5,
    color: '#0D47A1',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#B0BEC5',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#0D47A1',
  },
});

export default IntroductionScreen;

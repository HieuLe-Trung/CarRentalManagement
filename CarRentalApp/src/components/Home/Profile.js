import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Profile = ({ route, navigation }) => {
  const { token } = route.params; 
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://192.168.2.24:8000/user/current_user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEditInfo = (field) => {
    navigation.navigate('EditInfo', { field, userProfile });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!userProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Unable to load user profile.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="times" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tài khoản của tôi</Text>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: userProfile.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{`${userProfile.first_name || 'Xác thực ngay'} ${userProfile.last_name || 'Xác thực ngay'}`}</Text>
        <Text style={styles.joinDate}>{`Ngày tham gia: ${formatDate(userProfile.created_at)}`}</Text>
        
        <View style={styles.tripsContainer}>
          <View style={styles.tripsCountContainer}>
            <Icon name="suitcase" size={16} color="#000" />
            <Text style={styles.tripsCount}>{` ${userProfile.trips_count || 0} chuyến đi`}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoRow} onPress={() => handleEditInfo('license')}>
            <Text style={styles.infoLabel}>Giấy phép lái xe:</Text>
            <Text style={[styles.infoText, !userProfile.license && styles.alertText]}>{userProfile.license || 'Xác thực ngay'}</Text>
            <Text style={styles.editIcon}>{' >'}</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          
          <TouchableOpacity style={styles.infoRow} onPress={() => handleEditInfo('phone')}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={[styles.infoText, !userProfile.phone && styles.alertText]}>{userProfile.phone || 'Xác thực ngay'}</Text>
            <Text style={styles.editIcon}>{' >'}</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          
          <TouchableOpacity style={styles.infoRow} onPress={() => handleEditInfo('email')}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={[styles.infoText, !userProfile.email && styles.alertText]}>{userProfile.email || 'Xác thực ngay'}</Text>
            <Text style={styles.editIcon}>{' >'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 16,
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinDate: {
    fontSize: 12,
    color: '#666',
    margin: 10,
  },
  tripsContainer: {
    marginBottom: 20,
  },
  tripsCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  tripsCount: {
    marginLeft: 5,
    color: '#000',
  },
  infoContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {
    color: '#333',
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  alertText: {
    backgroundColor: '#FFDAB9', 
    color: '#000', 
    borderRadius: 5,
    paddingHorizontal: 5, 
  },
  editIcon: {
    color: '#007BFF',
    marginLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 5,
  },
});

export default Profile;

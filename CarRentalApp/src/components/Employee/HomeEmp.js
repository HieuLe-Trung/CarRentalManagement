import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeEmp = ({ route, navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = route.params; 

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://192.168.2.24:8000/user/current_user/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    console.error("Error fetching user data");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [token]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!userInfo) {
        return <Text>Không có thông tin người dùng.</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
                <Text style={styles.welcomeText}>Chào {userInfo.first_name} {userInfo.last_name}!</Text>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CarBrandManagement', { token })}>
                    <Text style={styles.cardText}>Hãng Xe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SaleCarManagement',{ token })}>
                    <Text style={styles.cardText}>Xe Bán</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RentCarManagement',{ token })}>
                    <Text style={styles.cardText}>Xe Thuê</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat')}>
                    <Text style={styles.cardText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RentalRecords',{ token })}>
                    <Text style={styles.cardText}>Phiếu Thuê</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Maintenance')}>
                    <Text style={styles.cardText}>Bảo Trì</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e9ecef',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#fff',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    card: {
        backgroundColor: '#4CAF50',
        padding: 30,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        width: '40%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    cardText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default HomeEmp;

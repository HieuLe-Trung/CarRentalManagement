import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, ActivityIndicator, FlatList, 
    TouchableOpacity, Alert, SafeAreaView, Image, Modal, 
    TextInput, Button 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker'; 

const CarBrandManagement = ({ route, navigation }) => {
    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAddVisible, setModalAddVisible] = useState(false); // Modal cho thêm hãng xe
    const [currentBrand, setCurrentBrand] = useState(null);
    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState('');
    const { token } = route.params; 

    useEffect(() => {
        const fetchCarBrands = async () => {
            try {
                const response = await fetch('http://192.168.2.24:8000/categories/');
                if (response.ok) {
                    const data = await response.json();
                    setCarBrands(data);
                } else {
                    console.error("Error fetching car brands");
                }
            } catch (error) {
                console.error("Error fetching car brands:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarBrands();
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            "Xóa Hãng Xe",
            "Bạn có chắc chắn muốn xóa hãng xe này?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://192.168.2.24:8000/categories/${id}/`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            if (response.ok) {
                                setCarBrands(prev => prev.filter(brand => brand.id !== id));
                                Alert.alert("Thông báo", "Đã xóa hãng xe thành công!");
                            } else {
                                Alert.alert("Lỗi", "Không thể xóa hãng xe.");
                            }
                        } catch (error) {
                            console.error("Error deleting car brand:", error);
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (brand) => {
        setCurrentBrand(brand);
        setBrandName(brand.name);
        setBrandImage(brand.image);
        setModalVisible(true);
    };

    const handleSave = async () => {
        const updatedFields = {};
        if (brandName !== currentBrand.name) updatedFields.name = brandName;
        if (brandImage !== currentBrand.image) updatedFields.image = brandImage;

        if (Object.keys(updatedFields).length === 0) {
            Alert.alert("Thông báo", "Không có thay đổi nào.");
            return;
        }

        try {
            const response = await fetch(`http://192.168.2.24:8000/categories/${currentBrand.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedFields),
            });

            const result = await response.json();
            if (response.ok) {
                setCarBrands(prev =>
                    prev.map(brand => (brand.id === currentBrand.id ? { ...brand, ...updatedFields } : brand))
                );
                Alert.alert("Thông báo", "Đã cập nhật hãng xe thành công!");
            } else {
                Alert.alert("Lỗi", "Không thể cập nhật hãng xe. Lỗi từ server: " + result.message);
            }
        } catch (error) {
            console.error("Error updating car brand:", error);
        } finally {
            setModalVisible(false);
        }
    };

    // Thêm hãng xe mới
    const handleAdd = () => {
        setBrandName(''); // Đặt lại tên hãng
        setBrandImage(''); // Đặt lại hình ảnh
        setModalAddVisible(true); // Mở modal thêm hãng xe
    };

    const saveNewBrand = async () => {
        if (!brandName || !brandImage) {
            Alert.alert("Thông báo", "Vui lòng nhập tên và chọn hình ảnh cho hãng xe.");
            return;
        }

        try {
            const response = await fetch('http://192.168.2.24:8000/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: brandName, image: brandImage }), // Gửi tên và hình ảnh
            });

            const result = await response.json();
            if (response.ok) {
                setCarBrands(prev => [...prev, result]); // Thêm hãng xe mới vào danh sách
                Alert.alert("Thông báo", "Đã thêm hãng xe thành công!");
            } else {
                Alert.alert("Lỗi", "Không thể thêm hãng xe. Lỗi từ server: " + result.message);
            }
        } catch (error) {
            console.error("Error adding car brand:", error);
        } finally {
            setModalAddVisible(false); // Đóng modal thêm hãng xe
        }
    };

    // Sử dụng hàm chooseImage
    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setBrandImage(result.assets[0].uri); // Lưu hình ảnh được chọn
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Danh sách các hãng xe</Text>
            <FlatList
                data={carBrands}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: `https://res.cloudinary.com/djkg7qktn/${item.image}` }} style={styles.brandImage} />
                        <Text style={styles.brandName}>{item.name}</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Icon name="edit" size={24} color="#007bff" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Icon name="trash" size={24} color="#dc3545" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Thêm Hãng Xe</Text>
            </TouchableOpacity>

            {/* Modal thêm hãng xe mới */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalAddVisible}
                onRequestClose={() => setModalAddVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thêm Hãng Xe</Text>
                        <Text style={styles.label}>Tên hãng: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tên hãng xe"
                            value={brandName}
                            onChangeText={setBrandName}
                        />
                        <TouchableOpacity onPress={chooseImage}>
                            <Text style={styles.pickImageText}>Chọn Hình Ảnh</Text>
                        </TouchableOpacity>
                        {brandImage && <Image source={{ uri: brandImage }} style={styles.previewImage} />}
                        <Button title="Lưu" onPress={saveNewBrand} />
                        <Button title="Hủy" color="#dc3545" onPress={() => setModalAddVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal chỉnh sửa hãng xe */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chỉnh sửa Hãng Xe</Text>
                        <Text style={styles.label}>Tên hãng: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tên hãng xe"
                            value={brandName}
                            onChangeText={setBrandName}
                        />
                        <TouchableOpacity onPress={chooseImage}>
                            <Text style={styles.pickImageText}>Chọn Hình Ảnh</Text>
                        </TouchableOpacity>
                        {brandImage && <Image source={{ uri: brandImage }} style={styles.previewImage} />}
                        <Button title="Lưu" onPress={handleSave} />
                        <Button title="Hủy" color="#dc3545" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: '#f8f9fa' 
    },
    headerText: { 
        textAlign: 'center', 
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 20, color: '#28a745' 
    },
    itemContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 15, marginVertical: 5, backgroundColor: '#fff', borderRadius: 10,
        borderColor: '#ccc', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3, shadowRadius: 3.84, elevation: 5, marginStart: 10, marginEnd: 10,
    },
    brandImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 30 
    },
    brandName: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#333', 
        flex: 1 
    },
    iconContainer: { 
        flexDirection: 'row' 
    },
    icon: { 
        marginLeft: 20 
    },
    addButton: { 
        backgroundColor: '#28a745', 
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginTop: 20 
    },
    addButtonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    listContainer: { 
        paddingBottom: 100 
    },
    modalContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },
    label: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 5, 
        alignSelf: 'flex-start' 
    },
    modalContent: { 
        width: '80%', 
        backgroundColor: '#fff', 
        padding: 20, 
        borderRadius: 10, 
        alignItems: 'center' 
    },
    modalTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
    input: { 
        width: '100%', 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 5, 
        padding: 10, 
        marginBottom: 20 
    },
    pickImageText: { 
        color: '#007bff', 
        marginBottom: 10 
    },
    previewImage: { 
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        marginBottom: 20 
    },
    loaderContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
});

export default CarBrandManagement;

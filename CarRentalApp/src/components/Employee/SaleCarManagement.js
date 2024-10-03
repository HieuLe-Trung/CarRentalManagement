import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, ActivityIndicator, FlatList, 
    TouchableOpacity, Alert, SafeAreaView, Image, Modal, 
    TextInput, Button 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const SaleCarManagement = ({ route, navigation }) => {
    const [saleCars, setSaleCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAddVisible, setModalAddVisible] = useState(false); // Modal for adding new car
    const [currentCar, setCurrentCar] = useState(null);
    const [carName, setCarName] = useState('');
    const [carImage, setCarImage] = useState('');
    const { token } = route.params; 

    useEffect(() => {
        const fetchSaleCars = async () => {
            try {
                const response = await fetch('http://192.168.2.24:8000/sale-car/');
                if (response.ok) {
                    const data = await response.json();
                    setSaleCars(data);
                } else {
                    console.error("Error fetching sale cars");
                }
            } catch (error) {
                console.error("Error fetching sale cars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSaleCars();
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            "Delete Car",
            "Are you sure you want to delete this car?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://192.168.2.24:8000/sale-car/${id}/`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            if (response.ok) {
                                setSaleCars(prev => prev.filter(car => car.id !== id));
                                Alert.alert("Notification", "Car deleted successfully!");
                            } else {
                                Alert.alert("Error", "Cannot delete the car.");
                            }
                        } catch (error) {
                            console.error("Error deleting sale car:", error);
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (car) => {
        setCurrentCar(car);
        setCarName(car.name);
        setCarImage(car.image);
        setModalVisible(true);
    };

    const handleSave = async () => {
        const updatedFields = {};
        if (carName !== currentCar.name) updatedFields.name = carName;
        if (carImage !== currentCar.image) updatedFields.image = carImage;

        if (Object.keys(updatedFields).length === 0) {
            Alert.alert("Notification", "No changes made.");
            return;
        }

        try {
            const response = await fetch(`http://192.168.2.24:8000/sale-car/${currentCar.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedFields),
            });

            const result = await response.json();
            if (response.ok) {
                setSaleCars(prev =>
                    prev.map(car => (car.id === currentCar.id ? { ...car, ...updatedFields } : car))
                );
                Alert.alert("Notification", "Car updated successfully!");
            } else {
                Alert.alert("Error", "Cannot update the car. Server error: " + result.message);
            }
        } catch (error) {
            console.error("Error updating sale car:", error);
        } finally {
            setModalVisible(false);
        }
    };

    const handleAdd = () => {
        setCarName(''); // Reset car name
        setCarImage(''); // Reset car image
        setModalAddVisible(true); // Open add car modal
    };

    const saveNewCar = async () => {
        if (!carName || !carImage) {
            Alert.alert("Notification", "Please enter a name and select an image for the car.");
            return;
        }

        try {
            const response = await fetch('http://192.168.2.24:8000/sale-car/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: carName, image: carImage }), // Send name and image
            });

            const result = await response.json();
            if (response.ok) {
                setSaleCars(prev => [...prev, result]); // Add new car to the list
                Alert.alert("Notification", "Car added successfully!");
            } else {
                Alert.alert("Error", "Cannot add the car. Server error: " + result.message);
            }
        } catch (error) {
            console.error("Error adding sale car:", error);
        } finally {
            setModalAddVisible(false); // Close add car modal
        }
    };

    // Use the chooseImage function
    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCarImage(result.assets[0].uri); // Save the selected image
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
            <Text style={styles.headerText}>Car Sale List</Text>
            <FlatList
                data={saleCars}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : '' }} style={styles.carImage} />
                        <Text style={styles.carName}>{item.name}</Text>
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
                <Text style={styles.addButtonText}>Add Car for Sale</Text>
            </TouchableOpacity>

            {/* Modal for adding new car */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalAddVisible}
                onRequestClose={() => setModalAddVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Car for Sale</Text>
                        <Text style={styles.label}>Car Name: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Car name"
                            value={carName}
                            onChangeText={setCarName}
                        />
                        <TouchableOpacity onPress={chooseImage}>
                            <Text style={styles.pickImageText}>Choose Image</Text>
                        </TouchableOpacity>
                        {carImage && <Image source={{ uri: carImage }} style={styles.previewImage} />}
                        <Button title="Save" onPress={saveNewCar} />
                        <Button title="Cancel" color="#dc3545" onPress={() => setModalAddVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal for editing car */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Car for Sale</Text>
                        <Text style={styles.label}>Car Name: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Car name"
                            value={carName}
                            onChangeText={setCarName}
                        />
                        <TouchableOpacity onPress={chooseImage}>
                            <Text style={styles.pickImageText}>Choose Image</Text>
                        </TouchableOpacity>
                        {carImage && <Image source={{ uri: carImage }} style={styles.previewImage} />}
                        <Button title="Save" onPress={handleSave} />
                        <Button title="Cancel" color="#dc3545" onPress={() => setModalVisible(false)} />
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
    carImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 30 
    },
    carName: { 
        fontSize: 16, 
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

export default SaleCarManagement;

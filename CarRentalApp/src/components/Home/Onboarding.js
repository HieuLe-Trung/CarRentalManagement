import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Swiper autoplay loop style={styles.wrapper}>
                <View style={styles.slide}>
                    <View style={[styles.section, { flex: 2 }]}>
                        <Text style={[styles.text, { marginBottom: -10 }]}>For</Text>
                        <Text style={styles.text}>Business</Text>
                        <Text style={[styles.textChild, { marginTop: 45 }]}>Cùng bạn chinh phục mọi hợp đồng </Text>
                        <Text style={styles.textChild}>Xe sang cho doanh nhân thành đạt</Text>
                    </View>
                    <View style={[styles.section, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                        <Image
                            source={require('../../assets/images/onboard1.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.section, { flex: 1, backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Bắt Đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                                                {/* SLIDE 2 */}
                <View style={styles.slide}>
                    <View style={[styles.section, { flex: 2 }]}>
                        <Text style={[styles.text, { marginBottom: -10 }]}>For</Text>
                        <Text style={styles.text}>Family</Text>
                        <Text style={[styles.textChild, { marginTop: 45 }]}>Hành trình hạnh phúc</Text>
                        <Text style={styles.textChild}>Xe rộng rãi cho cả gia đình</Text>
                    </View>
                    <View style={[styles.section, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                        <Image
                            source={require('../../assets/images/onboard2Family.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.section, { flex: 1, backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Bắt Đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                                                {/* SLIDE 3 */}
                <View style={styles.slide}>
                    <View style={[styles.section, { flex: 2 }]}>
                        <Text style={[styles.text, { marginBottom: -10 }]}>For</Text>
                        <Text style={styles.text}>Woman</Text>
                        <Text style={[styles.textChild, { marginTop: 45 }]}>Phong cách và an toàn</Text>
                        <Text style={styles.textChild}>Xe đẹp cho phụ nữ hiện đại</Text>
                    </View>
                    <View style={[styles.section, { flex: 3, justifyContent: 'center', alignItems: 'center'}]}>
                        <Image
                            source={require('../../assets/images/woman.avif')}
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.section, { flex: 1, backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Bắt Đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                                                {/* SLIDE 4 */}
                <View style={styles.slide}>
                    <View style={[styles.section, { flex: 2 }]}>
                        <Text style={[styles.text, { marginBottom: -10 }]}>For</Text>
                        <Text style={styles.text}>Pleasure</Text>
                        <Text style={[styles.textChild, { marginTop: 45 }]}>Trải nghiệm thú vị </Text>
                        <Text style={styles.textChild}> Xe thể thao cho những chuyến đi đam mê</Text>
                    </View>
                    <View style={[styles.section, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                        <Image
                            source={require('../../assets/images/onboard4Pleasure.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.section, { flex: 1, backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Bắt Đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                                                {/* SLIDE 5 */}
                <View style={styles.slide}>
                    <View style={[styles.section, { flex: 2 }]}>
                        <Text style={[styles.text, { marginBottom: -10 }]}>For</Text>
                        <Text style={styles.text}>Organizations</Text>
                        <Text style={[styles.textChild, { marginTop: 45 }]}>Trải nghiệm thú vị</Text>
                        <Text style={styles.textChild}>Xe sang cho doanh nhân thành đạt</Text>
                    </View>
                    <View style={[styles.section, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                        <Image
                            source={require('../../assets/images/onboard5Organiz.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.section, { flex: 1, backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Bắt Đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        </View>
    );
};

// const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    image: {
        width: 428,
        height: 465,
    },
    text: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: 5
    },
    textChild: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#6495ed',
        borderRadius: 40,
        paddingVertical: 15,  // Khoảng cách dọc của nút
        paddingHorizontal: 140,  // Khoảng cách ngang của nút
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Onboarding;

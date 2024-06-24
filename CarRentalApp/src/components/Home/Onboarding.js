import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
const slides = [
    {
        key: 'business',
        title: 'Business',
        description1: 'Cùng bạn chinh phục mọi hợp đồng',
        description2: 'Xe sang cho doanh nhân thành đạt',
        image: require('../../assets/images/onboard1.jpg')
    },
    {
        key: 'family',
        title: 'Family',
        description1: 'Hành trình hạnh phúc',
        description2: 'Xe rộng rãi cho cả gia đình',
        image: require('../../assets/images/onb2.png')
    },
    {
        key: 'woman',
        title: 'Woman',
        description1: 'Phong cách và an toàn',
        description2: 'Xe đẹp cho phụ nữ hiện đại',
        image: require('../../assets/images/woman.avif')
    },
    {
        key: 'pleasure',
        title: 'Pleasure',
        description1: 'Trải nghiệm thú vị',
        description2: 'Xe thể thao cho những chuyến đi đam mê',
        image: require('../../assets/images/onb4.png')
    },
    {
        key: 'organizations',
        title: 'Organizations',
        description1: 'Hợp tác vì sự phát triển',
        description2: 'Xây dựng cộng đồng vững mạnh',
        image: require('../../assets/images/onboard5Organiz.jpg')
    }
];
const Onboarding = ({navigation}) => {
    const handleHomePress = () => {
        navigation.navigate('Home');
    };
    return (
        <Swiper autoplay loop style={styles.wrapper}>
            {slides.map(slide => (
                <View key={slide.key} style={styles.slide}>
                    <View style={[styles.section, { flex: 2 }]}>
                        <Text style={[styles.text, { marginBottom: -10 }]}>For</Text>
                        <Text style={styles.text}>{slide.title}</Text>
                        <Text style={[styles.textChild, { marginTop: 45 }]}>{slide.description1}</Text>
                        <Text style={styles.textChild}>{slide.description2}</Text>
                    </View>
                    <View style={[styles.section, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                        <Image
                            source={slide.image}
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.section, { flex: 1, backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.button} onPress={handleHomePress}>
                            <Text style={styles.buttonText} >Bắt Đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </Swiper>
    );
};
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
        paddingVertical: 15,
        minWidth: 350,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Onboarding;

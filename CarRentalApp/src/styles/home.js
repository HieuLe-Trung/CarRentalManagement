import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '50%',
        borderBottomRightRadius: 45,
    },
    welcome: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        marginTop: 90,
        color: 'black',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 3,
    },
    welcomePart1: {
        color: '#00bfff',
        fontWeight: 'bold',
        fontSize: 28,
        textShadowColor: '#00bfff',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 2,
    },
    welcomeChild: {
        textAlign: 'center',
        fontSize: 13,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 70
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
    textSign: {
        fontSize: 42,
        fontWeight: 'bold',
        marginTop: 30,
        letterSpacing: 2,
        color: '#00008B'
    },
    textSignChild: {
        color: '#00008B',
        margin: 23
    },
    containerSign: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E9F8',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '90%',
    },
    icon: {
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        color: '#000',
    },
    buttonSign: {
        backgroundColor: '#2B3D62',
        borderRadius: 40,
        paddingVertical: 15,
        minWidth: '90%',
        alignItems: 'center',
        marginBottom: 15,
        bottom: -50,
    },
    textHaventAcc: {
        bottom: -100
    },
    textLogin: {
        fontWeight: 'bold',
        paddingLeft: 2,
    },
    or: {
        bottom: -150,
        color: '#00008B',
        fontWeight: 'bold',
    }
});
import { StyleSheet } from 'react-native';
import { Colors } from '../style/AllStyels';
export const Popstyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '70%',
        height: '40%',
        alignItems: "center"
    },
    messageText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10
    },
    closeButton: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: Colors.transparent,
        borderWidth: 3,
        borderColor: "#f07d3e",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 20,

    },
});
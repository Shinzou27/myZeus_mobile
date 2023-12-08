import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { project_color_10, project_color_30 } from "../theme";
import back from '../assets/back.png';
function BackButton({ handleNavigate }) {
    return (
        <View style={styles.backButton}>
            <TouchableOpacity onPress={() => {
                handleNavigate('home')
            }}>
                <Image source={back}/>
            </TouchableOpacity>
        </View>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: project_color_30,
        borderRadius: 20,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
    }
})
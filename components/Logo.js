import { View, Image, StyleSheet } from "react-native";
import logo from '../assets/logo_short.png'
function Logo({top, height, width}) {
    const styles = StyleSheet.create({
        view: {
            top: top
        },
        img: {
            alignSelf: 'center',
            width: width,
            height: height
        }
    })
    return ( 
        <View style={styles.view}>
            <Image style={styles.img} source={logo}/>
        </View>
     );
}

export default Logo;
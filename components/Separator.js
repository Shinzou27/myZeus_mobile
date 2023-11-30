import { View, StyleSheet } from "react-native";

function Separator() {
    return ( 
        <View style={[styles.hr, styles.separator]}/>
     );
}

export default Separator;
const styles = StyleSheet.create({
    separator: {
        marginVertical: 15
    },
    hr: {
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});
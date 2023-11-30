import { Text, StyleSheet, useColorScheme } from "react-native";
import theme from "../theme";
function Title({text}) {
    const scheme = useColorScheme();
    return (
        <Text style={[styles.atCenter, styles.title, theme[`font_${scheme}`]]}>
            {text}
        </Text>
    );
}

export default Title;
const styles = StyleSheet.create({
    atCenter: {
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
})
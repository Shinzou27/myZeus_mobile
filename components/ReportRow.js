import { Text, View, StyleSheet, useColorScheme } from "react-native";
function ReportRow({date, cost, brand, amount, petName}) {
    const scheme = useColorScheme();
    return ( 
        <View style={styles.view}>
            <Text style={[styles.info_large, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{date}</Text>
            <Text style={[styles.info_medium, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{cost}</Text>
            <Text style={[styles.info_small, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{brand}</Text>
            <Text style={[styles.info_medium, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{amount}</Text>
            <Text style={[styles.info_large, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{petName}</Text>
        </View>
     );
}

export default ReportRow;
const styles = StyleSheet.create({
    view: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: 30
    },
    info_large: {
        height: 30,
        width: 85,
    },
    info_medium: {
        height: 30,
        width: 60,
    },
    info_small: {
        height: 30,
        width: 45,
    },
    border_dark: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#fff'
    },
    border_light: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000'
    }
})
import { Text, View, StyleSheet, useColorScheme } from "react-native";
function ReportRow({date, cost, brand, amount}) {
    const scheme = useColorScheme();
    return ( 
        <View style={styles.view}>
            <Text style={[styles.info, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{date}</Text>
            <Text style={[styles.info, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{cost}</Text>
            <Text style={[styles.info, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{brand}</Text>
            <Text style={[styles.info, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{amount}</Text>
        </View>
     );
}

export default ReportRow;
const styles = StyleSheet.create({
    view: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: 30,
    },
    info: {
        height: 30,
        width: 80,
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
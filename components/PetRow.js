import { Text, View, StyleSheet, useColorScheme } from "react-native";
function PetRow({name, type, breed}) {
    const scheme = useColorScheme();
    function typeTranslator(type) {
        const ptbr = ['Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Outros'];
        const eng = ['dog', 'cat', 'bird', 'fish', 'others'];
        return ptbr[eng.indexOf(type)] || type;
    }
    return ( 
        <View style={styles.view}>
            <Text style={[styles.info_large, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{name}</Text>
            <Text style={[styles.info_large, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{typeTranslator(type)}</Text>
            <Text style={[styles.info_large, styles[`border_${scheme}`], theme[`font_${scheme}`]]}>{breed}</Text>
        </View>
     );
}

export default PetRow;
const styles = StyleSheet.create({
    view: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: 30
    },
    info_large: {
        height: 30,
        width: 110,
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
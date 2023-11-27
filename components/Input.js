import { StyleSheet, Text, View, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import MaskInput, {Masks, createNumberMask} from 'react-native-mask-input'
import theme from "../theme";

function Input({text, data, setter, type}) {
    let scheme = useColorScheme();
    let placeholder;
    if(['date', 'cost', 'brand', 'amount'].includes(type)) {
        let mask;
        type == 'date' ? [placeholder, mask] = ['__/__/___', Masks.DATE_DDMMYYYY]
            : type == 'cost' ? [placeholder, mask] = ['R$', Masks.BRL_CURRENCY]
            : type == 'brand' ? placeholder = 'Ex.: A, B, C'
            : [placeholder, mask] = ['Ex.: 100, 200, 1000', createNumberMask({delimiter: '.', precision: 0})]
        function handleChange(masked, unmasked) {
            setter(masked);
        }
        return (
            <View style={styles.view} >
                <Text style={theme[`font_${scheme}`]} >{text}</Text>
                <MaskInput value={data} onChangeText={handleChange} mask={mask} placeholder={placeholder} style={[styles.input, theme.theme_light]}/>
            </View>
        );
    } else {
        type == 'user' ? placeholder = 'Nome de usuário' : placeholder = 'Senha';
        function handlePress(t) {
            setter(t);
        }
        return (
            <View style={styles.view}>
                <Text style={theme[`font_${scheme}`]} >{text}</Text>
                <TextInput value={data} autoCapitalize="none" onChangeText={(t) => handlePress(t)} placeholder={placeholder} style={[styles.input, theme.theme_light]}/>
            </View>
        );
    }
}

export default Input;
const styles = StyleSheet.create({
    view: {
        height: 80,
        width: 300,
    },
    input: {
        borderRadius: 5,
        marginVertical: 5,
        paddingHorizontal: 5,
        borderWidth: StyleSheet.hairlineWidth
    }
})
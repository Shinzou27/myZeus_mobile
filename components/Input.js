import { StyleSheet, Text, View, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import MaskInput, {Masks, createNumberMask} from 'react-native-mask-input'
import theme from "../theme";

function Input({text, data, setter, type, placeholder, maskLimit}) {
    let scheme = useColorScheme();
    if(['date', 'cost', 'brand', 'amount', 'name', 'breed'].includes(type)) {
        let mask;
        let keyboardType;
        type == 'date' ? [mask, keyboardType] = [Masks.DATE_DDMMYYYY, 'numeric']
            : type == 'cost' ? [mask, keyboardType] = [Masks.BRL_CURRENCY, 'numeric']
            : type == 'amount' ? [mask, keyboardType] = [createNumberMask({delimiter: '.', precision: 0}), 'numeric']
            : keyboardType = 'default';
        function handleChange(masked, unmasked) {
            if(type == 'cost' || type == 'amount') {
                setter(unmasked);
            } else {
                setter(masked);
            }
        }
        return (
            <View style={styles.view} >
                <Text style={theme[`font_${scheme}`]} >{text}</Text>
                <MaskInput maxLength={maskLimit} value={data} keyboardType={keyboardType} onChangeText={handleChange} mask={mask} placeholder={placeholder} style={[styles.input, theme.theme_light]}/>
            </View>
        );
    } else {
        let isPassword;
        type == 'user' ? isPassword = false : isPassword = true;
        function handlePress(t) {
            setter(t);
        }
        return (
            <View style={styles.view}>
                <Text style={theme[`font_${scheme}`]} >{text}</Text>
                <TextInput value={data} secureTextEntry={isPassword} autoCapitalize="none" onChangeText={(t) => handlePress(t)} placeholder={placeholder} style={[styles.input, theme.theme_light]}/>
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
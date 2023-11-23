import { StyleSheet, Text, View, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import MaskInput from 'react-native-mask-input'
import theme from "../theme";

function Input({text, data, setter, type}) {
    let scheme = useColorScheme();
    let placeholder;
    if(['date', 'cost'].includes(type)) {
        let mask;
        type == 'date'
            ? [placeholder, mask] = ['__/__/___', [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]]
            : [placeholder, mask] = ['R$', ['R', '$', /\d/, /\d/, ',', /\d/, /\d/]];
        function handleChange(masked, unmasked) {
            setter(masked);
        }
        return (
            <View style={styles.view} >
                <Text style={theme[`font_${scheme}`]} >{text}</Text>
                <MaskInput value={data} onChangeText={handleChange} mask={mask} placeholder={placeholder} style={theme.theme_light}/>
            </View>
        );
    } else {
        type == 'user' ? placeholder = 'Nome de usuário' : placeholder = 'Senha';
        function handlePress() {
            setter(data);
        }
        return (
            <View style={styles.view}>
                <Text style={theme[`font_${scheme}`]} >{text}</Text>
                <TextInput value={data} onKeyPress={handlePress} placeholder={placeholder} style={theme.theme_light} />
            </View>
        );
    }
}

export default Input;
const styles = StyleSheet.create({
    view: {
        height: 80,
        width: 300
    }
})
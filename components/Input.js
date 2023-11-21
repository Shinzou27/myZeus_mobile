import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import MaskInput from 'react-native-mask-input'
import theme from "../theme";

function Input({text, data, setter, type}) {
    let scheme = useColorScheme();
    let mask;
    const [test, setTest] = useState('')
    type == 'date'
        ? mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
        : mask = ['R', '$', /\d/, /\d/, ',', /\d/, /\d/];
    function handleChange(masked, unmasked) {
        setter(masked);
    }
    return (
        <View >
            <Text style={theme[`font_${scheme}`]} >{text}</Text>
            <MaskInput value={data} onChangeText={handleChange} mask={mask} placeholder="R$" style={[styles.input, theme.theme_light]}/>
        </View>
    );
}

export default Input;
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300
    }
})
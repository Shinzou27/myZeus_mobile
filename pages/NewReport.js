import { StyleSheet, View, Button } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import { useColorScheme } from "react-native";
import theme, { project_color } from '../theme'

export default function NewReport({user}) {
    const [date, setDate] = useState('');
    const [cost, setCost] = useState('');
    const [brand, setBrand] = useState('');
    const [amount, setAmount] = useState();

    const scheme = useColorScheme();
    function parseDate(date) {
        let toFormat = date.split('/');
        toFormat = `${toFormat[2]}-${toFormat[1]}-${toFormat[0]}`;
        return toFormat;
    }
    function setToday(isChecked) {
        if (isChecked) {
            const today = new Date(Date());
            setDate('' + today.getUTCDate() + '/' + (today.getUTCMonth() + 1) + '/' + today.getUTCFullYear())
        }
    }
    function handlePost() {
        const toPostDate = new Date(parseDate(date));
        const toPostCost = cost.replace('R$', '');
        const toPostAmount = parseInt(amount);
        if (!isNaN(toPostDate)) {
            api.post('/reports',
            {
                date: toPostDate,
                cost: toPostCost,
                brand: brand,
                amount: toPostAmount,
                userId: user.id
            }
            ).then((response) => console.log(response.data)).catch((e) => console.log(e.message));
        }
    }
    return (
        <>
            <Input data={date} setter={setDate} text={'Data de compra:'} type={'date'} />
            <BouncyCheckBox style={styles.separator} size={25} text='Hoje' onPress={setToday} />
            <Input data={cost} setter={setCost} text={'Custo da ração:'} type={'cost'} />
            <Input data={brand} setter={setBrand} text={'Marca da ração:'} type={'brand'} />
            <Input data={amount} setter={setAmount} text={'Quantidade:'} type={'amount'} />
            <View style={styles.separator}></View>
            <Button onPress={handlePost} color={project_color} title='Enviar'></Button>
        </>
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 10
    }
});

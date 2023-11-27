import { StyleSheet, View, Button, Text, ToastAndroid } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import { useColorScheme } from "react-native";
import theme, { project_color } from '../theme'
import Title from '../components/Title';

export default function NewReport({ handleNavigate, user }) {
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
    function handleVerify(statement, message) {
        if (statement) {
            return true;
        }
        ToastAndroid.show(message, ToastAndroid.SHORT);
        return false;
    }
    function handlePost() {
        const toPostDate = new Date(parseDate(date));
        const toPostCost = cost.replace('R$ ', '');
        const toPostAmount = parseInt(amount.replace('.', ''));
        const allowance =   handleVerify(!isNaN(toPostDate), 'Data inválida.') &&
                            handleVerify(!(toPostDate.getFullYear() < 2010), 'Data antiga demais.') &&
                            handleVerify(!(toPostDate.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
                            handleVerify(toPostCost != '', 'Custo inválido.') &&
                            handleVerify(toPostAmount > 0, 'Quantidade inválida.');
        if (allowance) {
            api.post('/reports',
                {
                    date: toPostDate,
                    cost: toPostCost,
                    brand: brand,
                    amount: toPostAmount,
                    userId: user.id
                }
            ).then((response) => {
                console.log(response.data);
                ToastAndroid.show('Relatório adicionado!', ToastAndroid.SHORT);
                handleNavigate('home');
            }).catch((e) => console.log(e.message));
        }
    }
    return (
        <View>
            <Title text={'Adicione sua mais nova compra!'} />
            <View style={[styles.hr, styles.separator]}></View>
            <Input data={date} setter={setDate} text={'Data de compra:'} type={'date'} />
            <BouncyCheckBox style={[styles.separator, styles.atCenter]} size={25} text='Hoje' onPress={setToday} />
            <Input data={cost} setter={setCost} text={'Custo da ração:'} type={'cost'} />
            <Input data={brand} setter={setBrand} text={'Marca da ração:'} type={'brand'} />
            <Input data={amount} setter={setAmount} text={'Quantidade (g):'} type={'amount'} />
            <View style={styles.separator}></View>
            <Button onPress={handlePost} color={project_color} title='Enviar'></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 5
    },
    atCenter: {
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30
    },
    hr: {
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});

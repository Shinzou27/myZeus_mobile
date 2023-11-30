import { StyleSheet, View, Button, ToastAndroid } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import { useColorScheme } from "react-native";
import { project_color_30, project_color_10 } from '../theme'
import Title from '../components/Title';
import Separator from '../components/Separator';

export default function NewReport({ handleNavigate, user, pets }) {
    const [date, setDate] = useState('');
    const [cost, setCost] = useState('');
    const [brand, setBrand] = useState('');
    const [amount, setAmount] = useState();
    const [pet, setPet] = useState();

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
        const toPostPet = pets.filter((IteratedPet) => IteratedPet.name == pet)[0].id;
        const allowance = handleVerify(!isNaN(toPostDate), 'Data inválida.') &&
            handleVerify(!(toPostDate.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(toPostDate.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(toPostCost != '', 'Custo inválido.') &&
            handleVerify(toPostAmount > 0, 'Quantidade inválida.') &&
            handleVerify(toPostPet, 'Pet inválido.');
        if (allowance) {
            api.post('/reports',
                {
                    date: toPostDate,
                    cost: toPostCost,
                    brand: brand,
                    amount: toPostAmount,
                    userId: user.id,
                    petId: toPostPet
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
            <Separator />
            <Input data={date} setter={setDate} text={'Data de compra:'} type={'date'} />
            <BouncyCheckBox style={[styles.separator, styles.atCenter]} fillColor={project_color_10} size={25} text='Hoje' onPress={setToday} />
            <Input data={cost} setter={setCost} text={'Custo da ração:'} type={'cost'} />
            <Input data={brand} setter={setBrand} text={'Marca da ração:'} type={'brand'} />
            <Input data={amount} setter={setAmount} text={'Quantidade (g):'} type={'amount'} />
            <SelectDropdown buttonStyle={styles.select} buttonTextStyle={styles.selectTxt} defaultButtonText={'Selecione um pet'} rowTextAfterSelection={(selectedPet, index) => { return selectedPet }} data={pets.map((pet) => pet.name)} onSelect={(pet) => setPet(pet)} />
            <Separator />
            <Button onPress={handlePost} color={project_color_30} title='Enviar'></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    atCenter: {
        alignSelf: 'center'
    },
    select: {
        width: 'max-width',
        backgroundColor: project_color_30,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        padding: 10,
    },
    selectTxt: {
        color: '#fff'
    }
});

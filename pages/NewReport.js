import { StyleSheet, View, Button, ToastAndroid, Dimensions } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import SelectDropdown from 'react-native-select-dropdown';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import { useColorScheme } from "react-native";
import { project_color_30, project_color_10 } from '../theme'
import Title from '../components/Title';
import Separator from '../components/Separator';

export default function NewReport({ handleNavigate, user, pets, setPets }) {
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
    useEffect(() => {
        api.get(`/pets?id=${user.id}`).then((response) => {
            setPets(response.data);
        }).catch((e) => console.log(e.message));
    }, [])
    function setToday(isChecked) {
        if (isChecked) {
            const today = new Date(Date());
            let day, month;
            today.getUTCDate() < 10 ? day = '0' + today.getUTCDate() : day = today.getUTCDate();
            today.getUTCMonth() + 1 < 10 ? month = today.getUTCMonth() + 1 : month = today.getUTCMonth() + 1;
            let year = today.getUTCFullYear();
            setDate('' + day + '/' + (month) + '/' + year)
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
        const toPostPet = pets.filter((IteratedPet) => IteratedPet.name == pet)[0]?.id;
        const allowance = handleVerify(!isNaN(toPostDate), 'Data inválida.') &&
            handleVerify(!(toPostDate.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(toPostDate.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(toPostCost != '', 'Custo inválido.') &&
            handleVerify(parseFloat(toPostCost.replace('.', ',')) > 0, 'Insira um valor de custo positivo.') &&
            handleVerify(!isNaN(parseFloat(toPostCost.replace('.', ','))), 'Formato de custo inválido.') &&
            handleVerify(brand.length < 18, 'Nome de marca longo demais.') &&
            handleVerify(brand.length > 0, 'Nome de marca inválido.') &&
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
        <View style={styles.mainView}>
            <Title text={'Adicione sua mais nova compra!'} />
            <Separator />
            <Input placeholder={'__/__/____'} data={date} setter={setDate} text={'Data de compra:'} type={'date'} />
            <BouncyCheckBox style={[styles.separator, styles.atCenter]} fillColor={project_color_10} size={25} text='Hoje' onPress={setToday} />
            <Input placeholder={'Ex.: 70,00'} data={cost} setter={setCost} text={'Custo da ração (R$):'} type={'cost'} />
            <Input placeholder={'Ex.: A, B, C'} data={brand} setter={setBrand} text={'Marca da ração:'} type={'brand'} />
            <Input placeholder={'Ex.: 1000, 7500, 10000'} data={amount} setter={setAmount} text={'Quantidade (g):'} type={'amount'} />
            <SelectDropdown buttonStyle={styles.select} buttonTextStyle={styles.selectTxt} defaultButtonText={'Selecione um pet'} rowTextAfterSelection={(selectedPet, index) => { return selectedPet }} data={pets.map((pet) => pet.name)} onSelect={(pet) => setPet(pet)} />
            <Separator />
            <Button onPress={handlePost} color={project_color_30} title='Enviar'></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    atCenter: {
        alignSelf: 'center'
    },
    select: {
        width: '80%',
        backgroundColor: project_color_30,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        padding: 10,
    },
    selectTxt: {
        color: '#fff'
    }
});

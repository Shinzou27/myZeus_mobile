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
import BackButton from '../components/BackButton';

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
    function removeSpecialChar(input) {
        const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return input.replace(regex, '').replace(/[^a-zA-Z0-9 ]/g, "");
    }
    function handlePost() {
        const toPostDate = new Date(parseDate(date));
        const toPostCost = (parseFloat(cost.replace('R$ ', ''))/100).toFixed(2).replace('.', ',');
        console.log(toPostCost);
        const toPostBrand = removeSpecialChar(brand);
        const toPostAmount = parseInt(amount?.replace('.', ''));
        const toPostPet = pets.filter((iteratedPet) => iteratedPet.name == pet)[0]?.id;
        const allowance = handleVerify(!isNaN(toPostDate), 'Data inválida.') &&
            handleVerify(!(toPostDate.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(toPostDate.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(toPostCost != '', 'Custo inválido.') &&
            handleVerify(parseFloat(toPostCost.replace('.', ',')) > 0, 'Insira um valor de custo positivo.') &&
            handleVerify(parseFloat(toPostCost.replace('.', ',')) < 10000, 'Insira um valor de custo menor.') &&
            handleVerify(!isNaN(parseFloat(toPostCost.replace('.', ','))), 'Formato de custo inválido.') &&
            handleVerify(toPostBrand.length < 18, 'Nome de marca longo demais.') &&
            handleVerify(toPostBrand.length > 0, 'Nome de marca inválido.') &&
            handleVerify(brand == toPostBrand, 'O nome da marca contém caracteres inválidos.') &&
            handleVerify(toPostAmount > 0, 'Quantidade inválida.') &&
            handleVerify(toPostAmount < 100000, 'Quantidade inválida.') &&
            handleVerify(toPostPet, 'Pet inválido.');
        console.log(allowance);
        if (allowance) {
            const report = {
                date: toPostDate,
                cost: toPostCost,
                brand: toPostBrand,
                amount: toPostAmount,
                userId: user.id,
                petId: toPostPet
            }
            api.post('/reports', report).then((response) => {
                ToastAndroid.show('Relatório adicionado!', ToastAndroid.SHORT);
                handleNavigate('home');
            }).catch((e) => console.log(e.message));
        }
    }
    return (
        <View style={styles.mainView}>
            <BackButton handleNavigate={handleNavigate} />
            <Title text={'Adicione sua mais nova compra!'} />
            <Separator />
            <Input maskLimit={11} placeholder={'__/__/____'} data={date} setter={setDate} text={'Data de compra:'} type={'date'} />
            <BouncyCheckBox style={[styles.separator, styles.atCenter]} fillColor={project_color_10} size={25} text='Hoje' onPress={setToday} />
            <Input maskLimit={11} placeholder={'Ex.: 70,00'} data={cost} setter={setCost} text={'Custo da ração (R$):'} type={'cost'} />
            <Input maskLimit={18} placeholder={'Ex.: A, B, C'} data={brand} setter={setBrand} text={'Marca da ração:'} type={'brand'} />
            <Input maskLimit={9} placeholder={'Ex.: 1000, 7500, 10000'} data={amount} setter={setAmount} text={'Quantidade (g):'} type={'amount'} />
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

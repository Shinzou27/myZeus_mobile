import { StyleSheet, View, Button, ToastAndroid, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import { useColorScheme } from "react-native";
import { project_color_30, project_color_10 } from '../theme'
import Title from '../components/Title';
import Separator from '../components/Separator';
import BackButton from '../components/BackButton';

export default function NewPet({ handleNavigate, user }) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [type, setType] = useState('');

    const scheme = useColorScheme();

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
        const toPostName = removeSpecialChar(name);
        const toPostBreed = removeSpecialChar(breed);
        const allowance = handleVerify(name.length < 18, 'Nome longo demais.') &&
            handleVerify(name.replace(' ', '').replace(' ', '').length > 0, 'Nome inválido.') &&
            handleVerify(name == toPostName, 'O nome do pet contém caracteres inválidos.') &&
            handleVerify(breed == toPostBreed, 'O nome da raça contém caracteres inválidos.') &&
            handleVerify(breed.length < 31, 'Nome de raça longo demais.') &&
            handleVerify(breed.replace(' ', '').replace(' ', '').length > 0, 'Nome de raça inválido.') &&
            handleVerify(type, 'Tipo de pet inválido.');
        if (allowance) {
            const pet = {
                name: name,
                breed: breed,
                type: type,
                userId: user.id
            }
            api.post(`/pets?id=${user.id}`, pet).then((response) => {
                console.log(response.data);
                ToastAndroid.show('Pet adicionado!', ToastAndroid.SHORT);
                handleNavigate('home');
            }).catch((e) => console.log(e.message));
        }
    }
    return (
        <View style={styles.mainView}>
            <BackButton handleNavigate={handleNavigate} />
            <Title text={'Adicione seu pet à sua conta!'} />
            <Separator />
            <Input maskLimit={18} data={name} setter={setName} text={'Nome:'} type={'name'} placeholder={'Escreva aqui o nome de seu amiguinho!'}/>
            <SelectDropdown buttonStyle={styles.select} buttonTextStyle={styles.selectTxt} defaultButtonText={'Selecione que animal seu pet é'} rowTextAfterSelection={(selectedType, index) => { return selectedType }} data={['dog', 'cat', 'bird', 'fish', 'others']} onSelect={(type) => setType(type)} />
            <Input maskLimit={31} data={breed} setter={setBreed} text={'Raça:'} type={'breed'} placeholder={'Ex.: Persa, Yorkshire, etc.'}/>
            <Separator />
            <Button onPress={handlePost} color={project_color_30} title='Adicionar'></Button>
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

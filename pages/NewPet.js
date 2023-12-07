import { StyleSheet, View, Button, ToastAndroid, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import { useColorScheme } from "react-native";
import { project_color_30, project_color_10 } from '../theme'
import Title from '../components/Title';
import Separator from '../components/Separator';

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
    function handlePost() {
        const allowance = handleVerify(name.length < 18, 'Nome longo demais.') &&
            handleVerify(name.replace(' ', '').replace(' ', '').length > 0, 'Nome inválido.') &&
            handleVerify(breed.length < 31, 'Raça longa demais.') &&
            handleVerify(breed.replace(' ', '').replace(' ', '').length > 0, 'Raça inválida.');
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
            <Title text={'Adicione seu pet à sua conta!'} />
            <Separator />
            <Input data={name} setter={setName} text={'Nome:'} type={'name'} placeholder={'Escreva aqui o nome de seu amiguinho!'}/>
            <SelectDropdown buttonStyle={styles.select} buttonTextStyle={styles.selectTxt} defaultButtonText={'Selecione que animal seu pet é'} rowTextAfterSelection={(selectedType, index) => { return selectedType }} data={['dog', 'cat', 'bird', 'fish', 'others']} onSelect={(type) => setType(type)} />
            <Input data={breed} setter={setBreed} text={'Raça:'} type={'breed'} placeholder={'Ex.: Persa, Yorkshire, etc.'}/>
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

import { View, useColorScheme, Button, ToastAndroid } from "react-native";
import theme, { project_color_10 } from "../theme";
import Input from "../components/Input";
import Logo from "../components/Logo";
import Title from "../components/Title";
import { useState } from "react";
import { project_color_30 } from "../theme";
import { api } from "../services/api";

function Register({ setUser, setPets, handleNavigate }) {
    const scheme = useColorScheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let id;
    function handleLog() {
        if (password == confirmPassword) {
            const user = {
                username: username,
                password: password
            }
            api.post(`/users`, user).then((response) => {
                if (response.data.token) {
                    setUser(response.data);
                    id = parseInt(response.data.id);
                    api.get(`/pets?id=${id}`).then((response) => {
                        setPets(response.data);
                        handleNavigate('home');
                    }).catch((e) => console.log(e.message));
                } else {
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                }
            }).catch((e) => console.log(e.message));
        } else {
            ToastAndroid.show('As senhas não são iguais.', ToastAndroid.SHORT);
        }
    }
    return (
        <View style={theme[`theme_${scheme}`]}>
            <Logo top={-160} width={120} height={60} />
            <Title text={'Criar conta'} />
            <Input text={'Nome de usuário:'} data={username} setter={setUsername} type={'user'} />
            <Input text={'Senha:'} data={password} setter={setPassword} type={'password'} />
            <Input text={'Confirme sua senha:'} data={confirmPassword} setter={setConfirmPassword} type={'password'} />
            <View style={{ display: "flex", flexDirection: 'row' }}>
                <View style={{ width: 120, marginHorizontal: 10 }}>
                    <Button onPress={handleLog} color={project_color_10} title='Criar conta'></Button>
                </View>
            </View>
        </View>
    );
}

export default Register;
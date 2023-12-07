import { View, useColorScheme, Button, ToastAndroid } from "react-native";
import theme, { project_color_10 } from "../theme";
import Input from "../components/Input";
import Logo from "../components/Logo";
import Title from "../components/Title";
import { useState } from "react";
import { project_color_30 } from "../theme";
import { api } from "../services/api";

function Login({ setUser, setPets, handleNavigate }) {
    const scheme = useColorScheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let id;
    function handleLog() {
        const user = {
            username: username,
            password: password
        }
        api.post(`/login`, user).then((response) => {
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
    }
    return (
        <View style={theme[`theme_${scheme}`]}>
            <Logo top={-160} width={120} height={60} />
            <Title text={'Entre ou cadastre-se!'} />
            <Input text={'Nome de usuário:'} data={username} setter={setUsername} type={'user'} />
            <Input text={'Senha:'} data={password} setter={setPassword} type={'password'} />
            <View style={{ display: "flex", flexDirection: 'row' }}>
                <View style={{width: 120, marginHorizontal: 10}}>
                    <Button onPress={handleLog} color={project_color_30} title='Entrar'></Button>
                </View>
                <View style={{width: 120, marginHorizontal: 10}}>
                    <Button onPress={handleLog} color={project_color_10} title='Criar conta'></Button>
                </View>
            </View>
        </View>
    );
}

export default Login;
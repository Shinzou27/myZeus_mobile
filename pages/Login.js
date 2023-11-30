import { View, useColorScheme, Button, Text } from "react-native";
import theme from "../theme";
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
        api.get(`/users?username=${username}&password=${password}`).then((response) => {
            setUser(response.data);
            id = parseInt(response.data.id);
            api.get(`/pets?id=${id}`).then((response) => {
                setPets(response.data);
                handleNavigate('home');
            }).catch((e) => console.log(e.message));
        }).catch((e) => console.log(e.message));
    }
    return (
        <View style={theme[`theme_${scheme}`]}>
            <Logo top={-160} width={120} height={60} />
            <Title text={'Entre ou cadastre-se!'}/>
            <Input text={'Nome de usuário:'} data={username} setter={setUsername} type={'user'} />
            <Input text={'Senha:'} data={password} setter={setPassword} type={'password'} />
            <Button onPress={handleLog} color={project_color_30} title='Entrar'></Button>
        </View>
    );
}

export default Login;
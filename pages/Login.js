import { View, useColorScheme, Button } from "react-native";
import theme from "../theme";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { project_color } from "../theme";
import { api } from "../services/api";

function Login({user, setter, handleNavigate}) {
    const scheme = useColorScheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function handleLog() {
        api.get(`/users?username=${username}&password=${password}`).then((response) => {
            setter(response.data);
            handleNavigate('home');
        }).catch((e) => console.log(e.message));
    }
    return ( 
        <View style={theme[`theme_${scheme}`]}>
            <Input text={'Nome de usuário:'} data={username} setter={setUsername} type={'user'} />
            <Input text={'Senha:'} data={password} setter={setPassword} type={'password'} />
            <Button onPress={handleLog} color={project_color} title='Enviar'></Button>
        </View>
     );
}

export default Login;
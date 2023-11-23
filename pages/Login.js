import { View, useColorScheme, Button } from "react-native";
import theme from "../theme";
import Input from "../components/Input";
import { useState } from "react";
import { project_color } from "../theme";

function Login() {
    const scheme = useColorScheme();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    return ( 
        <View style={theme[`theme_${scheme}`]}>
            <Input text={'Nome de usuário:'} data={user} setter={setUser} type={'user'} />
            <Input text={'Senha:'} data={password} setter={setPassword} type={'password'} />
            <Button color={project_color} title='Enviar'></Button>
        </View>
     );
}

export default Login;
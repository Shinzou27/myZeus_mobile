import { project_color } from "../theme";
import { Button } from "react-native";
function Home({handleNavigate}) {
    return (
        <>
            <Button onPress={() => handleNavigate('new')} title='Adicionar relatório' color={project_color} />
            <Button onPress={() => handleNavigate('list')} title='Ver lista de relatórios' color={project_color} />
            <Button onPress={() => handleNavigate('login')} title='Test login' color={project_color} />
        </>
    );
}

export default Home;
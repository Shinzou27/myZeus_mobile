import theme, { project_color_10, project_color_30 } from "../theme";
import { Button, View, Text, useColorScheme } from "react-native";
import { StyleSheet } from "react-native";

function Home({ handleNavigate, setUser, user }) {
    const scheme = useColorScheme();
    function handleLogout() {
        handleNavigate('login');
        setUser(null);
    }
    return (
        <View>
            <View style={styles.topView}>
                <Text style={[styles.mainViewTxt, theme[`font_${scheme}`]]}>{`Seja bem-vindo(a), ${user.username}!`}</Text>
            </View>
            <View style={styles.flex}>
                <View style={styles.btnView}>
                    <Button onPress={() => handleNavigate('new')} title='Novo relatório' color={project_color_30} />
                </View>
                <View style={styles.btnView}>
                    <Button onPress={() => handleNavigate('list')} title='Lista de relatórios' color={project_color_30} />
                </View>
            </View>
            <View style={styles.flex}>
                <View style={styles.btnView}>
                    <Button onPress={() => handleNavigate('newpet')} title='Novo pet' color={project_color_30} />
                </View>
                <View style={styles.btnView}>
                    <Button onPress={() => handleNavigate('petlist')} title='Lista de pets' color={project_color_30} />
                </View>
            </View>
            <View style={styles.bottomView}>
                <Text onPress={handleLogout} style={[styles.mainViewTxt]}>Sair</Text>
            </View>
        </View>
    );
}

export default Home;
const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    btnView: {
        width: 160,
        marginHorizontal: 10
    },
    topView: {
        top: -200,
        alignItems: 'center'
    },
    bottomView: {
        top: 200,
        alignItems: 'center'
    },
    mainViewTxt: {
        fontSize: 24,
        fontWeight: 'bold',
        color: project_color_10
    }
})
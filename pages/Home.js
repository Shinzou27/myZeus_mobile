import theme, { project_color } from "../theme";
import { Button, View, Text, useColorScheme, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

function Home({ handleNavigate, user }) {
    const scheme = useColorScheme();
    return (
        <View>
            <View style={styles.topView}>
                <Text style={[styles.topViewTxt, theme[`font_${scheme}`]]}>{`Seja bem-vindo(a), ${user.username}!`}</Text>
            </View>
            <View style={styles.flex}>
                <View style={styles.btnView}>
                    <Button onPress={() => handleNavigate('new')} title='Adicionar relatório' color={project_color} />
                </View>
                <View style={styles.btnView}>
                    <Button onPress={() => handleNavigate('list')} title='Ver lista de relatórios' color={project_color} />
                </View>
            </View>
        </View>
    );
}

export default Home;
const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'row'
    },
    btnView: {
        width: 150,
        marginHorizontal: 10
    },
    topView: {
        top: -200,
        alignItems: 'center'
    },
    topViewTxt: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})
import { ScrollView, useColorScheme, StyleSheet, SafeAreaView } from "react-native";
import { api } from '../services/api'
import theme from "../theme";
import { useEffect, useState } from "react";
import PetRow from "../components/PetRow";
import Title from "../components/Title";
import Separator from "../components/Separator";
import BackButton from "../components/BackButton";

function PetList({ user, handleNavigate }) {
    const scheme = useColorScheme();
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get(`/pets?id=${user.id}`).then((response) => {
            setData(response.data);
        }).catch((e) => console.log(e.message));
    }, []);
    return (
        <SafeAreaView style={[styles.view, theme[`theme_${scheme}`]]}>
            <BackButton handleNavigate={handleNavigate} />
            <Title text={'Lista de pets'} />
            <Separator />
            <ScrollView contentContainerStyle={[styles.scrollView]}>
                <PetRow name={'Nome'} type={'Tipo'} breed={'Raça'} />
                {data.length > 0 && data.map((pet) =>
                    <PetRow key={pet.id} name={pet.name} type={pet.type} breed={pet.breed} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default PetList;
const styles = StyleSheet.create({
    view: {
        paddingTop: 100,
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
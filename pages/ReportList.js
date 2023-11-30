import { ScrollView, useColorScheme, StyleSheet, SafeAreaView } from "react-native";
import { api } from '../services/api'
import theme from "../theme";
import { useEffect, useState } from "react";
import ReportRow from "../components/ReportRow";
import Title from "../components/Title";
import Separator from "../components/Separator";

function ReportList({ user, pets }) {
    const scheme = useColorScheme();
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get(`/reports?id=${user.id}`).then((response) => {
            setData(response.data.sort((a, b) => {
                a = new Date(a.date);
                b = new Date(b.date);
                return (a - b);
            }));
        }).catch((e) => console.log(e.message));
    }, []);
    function parseDate(date) {
        const toFormat = new Date(date);
        let day;
        let month;
        toFormat.getUTCDate() < 10 ? day = "0" + toFormat.getUTCDate() : day = toFormat.getUTCDate();
        (toFormat.getUTCMonth() + 1) < 10 ? month = "0" + (toFormat.getUTCMonth() + 1) : month = (toFormat.getUTCMonth() + 1);
        return day + "/" + month + "/" + toFormat.getFullYear();
    }
    return (
        <SafeAreaView style={[styles.view, theme[`theme_${scheme}`]]}>
            <Title text={'Lista de relatórios'} />
            <Separator />
            <ScrollView contentContainerStyle={[styles.scrollView]}>
                <ReportRow date={'Data'} cost={'Custo'} brand={'Marca'} amount={'Qte. (g)'} petName={'Pet'} />
                {data.length > 0 && data.map((report) =>
                    <ReportRow key={report.id} date={parseDate(report.date)} cost={report.cost} brand={report.brand} amount={report.amount} petName={pets.filter((pet) => pet.id == report.petId)[0].name} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ReportList;
const styles = StyleSheet.create({
    view: {
        paddingTop: 100,
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
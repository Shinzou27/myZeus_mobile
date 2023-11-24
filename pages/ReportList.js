import { View, useColorScheme, Text } from "react-native";
import { api } from '../services/api'
import theme from "../theme";
import { useEffect, useState } from "react";

function ReportList({user}) {
    const scheme = useColorScheme();
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get(`/reports?id=${user.id}`).then((response) => {
            setData(response.data);
        }).catch((e) => console.log(e.message));
    }, []);
    return (
        <View style={theme[`theme_${scheme}`]}>
            <Text style={theme[`font_${scheme}`]}>Lista de relatórios</Text>
            {data.length > 0 && data.map((report) => 
                <Text key={report.id} style={theme[`font_${scheme}`]}>{report.date} | {report.cost}</Text>
            )}
        </View>
    );
}

export default ReportList;
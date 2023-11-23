import { View, useColorScheme, Text } from "react-native";
import { api } from '../services/api'
import theme from "../theme";
import { useEffect, useState } from "react";

function ReportList() {
    const scheme = useColorScheme();
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get('/reports').then((response) => {
            setData(response.data);
        }).catch((e) => console.log(e.message));
    }, []);
    return (
        <View style={theme[`theme_${scheme}`]}>
            <Text style={theme[`font_${scheme}`]}>Lista</Text>
            {data.length > 0 && data.map((report) => 
                <Text style={theme[`font_${scheme}`]}>{report.date} | {report.cost}</Text>
            )}
        </View>
    );
}

export default ReportList;
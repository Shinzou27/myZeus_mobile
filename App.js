import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { api } from './services/api';
import Input from './components/Input';
import Logo from './components/Logo';
import { useColorScheme } from "react-native";
import theme from './theme'

export default function App() {
  const projColor = '#00eeaa';
  const [date, setDate] = useState('');
  const [cost, setCost] = useState('');
  const scheme = useColorScheme();
  function parseDate(date) {
    let toFormat = date.split('/');
    toFormat = `${toFormat[2]}-${toFormat[1]}-${toFormat[0]}`;
    return toFormat;
  }
  function setToday(isChecked) {
    if (isChecked) {
      const today = new Date(Date());
      setDate('' + today.getUTCDate() + '/' + (today.getUTCMonth() + 1) + '/' + today.getUTCFullYear())
    }
  }
  function handlePost() {
    const toPostDate = new Date(parseDate(date));
    const toPostCost = cost.replace('R$', '');
    console.log(toPostCost);
    if (!isNaN(toPostDate)) {
      api.post('/reports', {date: toPostDate, cost: toPostCost}).then((response) => console.log(response.data)).catch((e) => console.log(e.message));   
    }
  }
  return (
    <SafeAreaProvider>
      <View style={[styles.container, theme[`theme_${scheme}`]]}>
        <StatusBar style="auto" />
        <Input data={date} setter={setDate} text={'Adicione a data que a ração foi comprada:'} type={'date'} />
        <BouncyCheckBox style={styles.separator} size={25} text='Hoje' onPress={setToday} />
        <Input data={cost} setter={setCost} text={'Adicione o custo da ração comprada:'} type={'cost'} />
        <View style={styles.separator}></View>
        <Button onPress={handlePost} color={projColor} title='Enviar'></Button>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 10
  }
});

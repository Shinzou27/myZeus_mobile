import { SafeAreaProvider } from 'react-native-safe-area-context'
import NewReport from './pages/NewReport';
import ReportList from './pages/ReportList';
import Login from './pages/Login';
import Home from './pages/Home';
import { View } from 'react-native';
import { useColorScheme, BackHandler } from 'react-native';
import theme from './theme';
import { useEffect, useState } from 'react';

export default function App() {
  const scheme = useColorScheme();
  const [user, setUser] = useState();
  const [screen, setScreen] = useState('');
  useEffect(() => {
    setScreen('login');
  }, [])
  function handleNavigate(screen) {
    console.log(`Indo para a tela de ${screen}`);
    setScreen(screen);
  }
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (screen != 'home') {
      handleNavigate('home');
      return true;
    }
  })
  return (
    <SafeAreaProvider>
      <View style={theme[`theme_${scheme}`]}>
        {screen == 'login' ? <Login setter={setUser} handleNavigate={handleNavigate}/> :
          screen == 'new' ? <NewReport user={user}/> :
            screen == 'list' ? <ReportList user={user}/> :
              <Home handleNavigate={handleNavigate} />
        }
      </View>
    </SafeAreaProvider>
  );
}

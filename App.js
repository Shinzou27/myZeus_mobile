import { SafeAreaProvider } from 'react-native-safe-area-context'
import NewReport from './pages/NewReport';
import ReportList from './pages/ReportList';
import Login from './pages/Login';
import Home from './pages/Home';
import { View } from 'react-native';
import { useColorScheme, BackHandler, ImageBackground } from 'react-native';
import theme from './theme';
import bg from './assets/bg.png'
import { useEffect, useState } from 'react';
import NewPet from './pages/NewPet';
import PetList from './pages/PetList';

export default function App() {
  const scheme = useColorScheme();
  const [user, setUser] = useState();
  const [pets, setPets] = useState();
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
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center', opacity: 1 }} source={bg}>
          {!user ? <Login setUser={setUser} setPets={setPets} handleNavigate={handleNavigate} />
            : screen == 'new' ? <NewReport handleNavigate={handleNavigate} user={user} pets={pets} setPets={setPets} /> :
              screen == 'newpet' ? <NewPet user={user} /> :
              screen == 'list' ? <ReportList user={user} pets={pets} /> :
              screen == 'petlist' ? <PetList user={user} /> :
              <Home handleNavigate={handleNavigate} setUser={setUser} user={user} />
          }
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

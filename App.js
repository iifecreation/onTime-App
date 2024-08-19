import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screen/HomeScreen';
import OnboardingScreen from './screen/OnboardingScreen';
import LoginScreen from './screen/LoginScreen';
import { useFonts } from 'expo-font';
import Notification from './screen/NotificationScreen';
import SettingScreen from './screen/SettingScreen';
import NoteScreen from './screen/NoteScreen';
import ScheduleScreen from './screen/ScheduleScreen';
import EditNoteScreen from './screen/EditNoteScreen';
import AboutScreen from './screen/AboutScreen';
import EditScheduleScreen from './screen/EditScheduleScreen';
import { ActivityIndicator, View } from 'react-native';
import ThemeProvider from './context/ThemeProvider';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { initializeDatabase } from './database/db-service';

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [fontsLoaded, fontError] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
  });

  if(!fontsLoaded){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SQLiteProvider databaseName='onTime.db' onInit={initializeDatabase}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notified" component={Notification} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="EditNote" component={EditNoteScreen} />
            <Stack.Screen name="EditSchedule" component={EditScheduleScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SQLiteProvider>
  );
}

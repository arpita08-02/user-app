// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './AppNavigator';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }






import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      
      <AppNavigator />
    </>
  );
};

export default App;

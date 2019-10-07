import React from 'react';
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNav from './components/TabNav'
import EntryDetail from './components/EntryDetail'
import { setLocalNotification } from './utils/helpers'


import Constants from 'expo-constants'

function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      header: null
    } 
  }, 
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
  }))

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        
        <View style={{ flex: 1}}>
          <MyStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
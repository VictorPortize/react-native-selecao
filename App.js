import {createStackNavigator} from 'react-navigation'
import Inicial from './Pages/Inicial'
import Resultado from './Pages/Resultado'

export default createStackNavigator({
  Inicial:{
    screen:Inicial
  },
  Resultado:{
    screen:Resultado
  }
},{
  navigationOptions:{
    header:null
  }
})
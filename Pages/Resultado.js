import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import {Header} from 'react-native-elements'
import {List,Button} from 'react-native-paper'

let {width} = Dimensions.get('window')
 
export default class Resultado extends React.Component{
    constructor(props){
        super(props)

        this.state={
            listaOrdenada:this.props.navigation.state.params.notas.sort(function(a,b){ return b-a}),
            quantidade:[]
        }
    }
                         
    render(){
        const {listaOrdenada} = this.state
        let valor = this.props.navigation.state.params.numero
        const quantidade = listaOrdenada.slice()
        quantidade.fill(0)
        let n = 0
        while(valor != 0){
            if(valor - listaOrdenada[n] >= 0){
                valor = valor-listaOrdenada[n]
                quantidade[n] = quantidade[n] + 1
            }else{
                if(n < listaOrdenada.length-1)
                    n++
                else if(valor < Math.min(...listaOrdenada))
                    break
                else{
                    this.setState({quantidade})
                    break
                }
            }
        }
        return(
            <View>
                <Header outerContainerStyles={{height:90}}
                centerComponent={<Text style={{fontSize:30}}>Resultado</Text>}></Header>
                <Text style={styles.resultado}>Número: {this.props.navigation.state.params.numero}</Text>
                <View style={styles.container}>
                    <List.Accordion title="São necessárias" >
                        {this.state.listaOrdenada.map((value,indice) => quantidade[indice] == 0 ?
                            <List.Item key={indice} title={"Nenhuma nota de "+value} ></List.Item> : 
                            <List.Item key={indice} title={quantidade[indice]+'notas de '+ value}></List.Item>)}
                    </List.Accordion>;
                    <Text style={{alignSelf:'center',fontSize:20,marginBottom:10}}>{valor == 0? "":"Sobra: "+valor}</Text>
                    <Button mode='contained' onPress={() => this.props.navigation.replace('Inicial')}>Voltar</Button>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    resultado:{
        marginTop:30,
        fontSize:30,
        alignSelf:'center'
    },
    container:{
        width:width*0.70,
        alignSelf:'center'
    }
})
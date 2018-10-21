import React from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput,Dimensions,Alert} from 'react-native';
import {Header} from 'react-native-elements'
import {List,Button} from 'react-native-paper'

let {width} = Dimensions.get('screen')

export default class Inicial extends React.Component {
    constructor(props){
        super(props)

        this.state={
            numero:'',
            valor:'',
            nota:'',
            notas:[20, 10, 5, 3]
        }
    }

  render() {
      let {numero,valor,nota,notas} = this.state
    return (
      <ScrollView style={{backgroundColor:'white'}}>
      <Header outerContainerStyles={{height:90,}}
      centerComponent={<Text style={{fontSize:40,fontWeight:'bold'}}>Calcular troco</Text>}></Header>
        <Text style={styles.textTitle}>Número digitado</Text>
        <Text style={styles.numero}>{numero}</Text>
        
        <View style={styles.container2}>
            <TextInput value={valor} style={[styles.textInput,{width:width*0.50,flex:0.8}]} keyboardType='numeric'
            onChangeText={text => {
                if(text > 10000){
                    text = 10000
                }
                this.setState({valor:text.toString()})
            }}></TextInput>
            <Button style={{flex:0.2}} mode="contained" onPress={() =>{
                if(this.state.valor >= 1){
                    this.setState({numero:valor})
                    this.render()
                }
            }}>Salvar</Button>
        </View>
        
        <Text style={styles.numero}>Inserir Notas</Text>
        <View style={styles.container2}>
            <TextInput value={nota} style={[styles.textInput,{width:width*0.50,flex:0.8}]} keyboardType='numeric'
            onChangeText={text => {
                if(text > 10000){
                    text = 10000
                }
                this.setState({nota:text.toString()})
            }}></TextInput>
            <Button style={{flex:0.2}} mode="contained"
            onPress={() => {
                if(notas.includes(Number.parseInt(nota))){
                    Alert.alert("Erro","A Nota digitada já está presente na lista")
                }
                else if(nota >= 1){
                    let array = notas
                    array.push(nota)
                    array.sort((a,b) => b-a)
                    this.setState({notas:array,nota:''})
                    this.render()
                }else if(nota < 0){
                    Alert.alert("Erro",'Por favor insira uma nota com valor positivo')
                }
            }}>Add</Button>
        </View>
        
        <View style={styles.list}>
            <List.Accordion title={"Notas disponiveis"}>
                {this.state.notas.map((valor,indice) => <List.Item key={indice} title={valor} 
                onPress={() =>{
                    let array = notas
                    array.splice(indice,1)
                    this.setState({notas:array})
                    this.render
                }}></List.Item>)}
            </List.Accordion>
            <Button style={styles.buttonApagar} mode='contained' onPress={() => this.setState({notas:[]})} >Limpar Notas</Button>
        </View>
        <Button mode='contained' style={styles.buttonCalcular} onPress={ () => {
            if(numero > 0){
            this.props.navigation.replace('Resultado',{notas,numero})
            }else{
                Alert.alert("Erro","Por favor insira um número maior que 0 (zero)")
            }
        }}>Calcular</Button>
      </ScrollView>
    );
  }
}   

const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    width:width*0.60
  },
  container2:{
    flex:1,
    flexDirection:'row',
    width:width*0.65,
    alignSelf:'center'
  },
  numero:{
    marginTop:20,
    alignSelf:'center',
    marginBottom:10,
    fontSize:18
  },
  textInput:{
    paddingLeft:10,
    height:45,
    textAlign:'center',
    borderRadius:30,
    backgroundColor:'rgba(0,0,0,0.05)'
  },
  list:{
    width:width*0.65,
    alignSelf:'center',
    marginTop:20
  },
  buttonCalcular:{
    marginTop:30,
    width:width*0.8,
    alignSelf:'center'
  },
  textTitle:{
    marginTop:70,
    alignSelf:'center',
    fontSize:20
  },
  buttonApagar:{
    marginTop:30,
    backgroundColor:'red'
  }
});


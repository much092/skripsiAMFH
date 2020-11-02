import React from 'react';
import { Component,useState } from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

class AddClient extends Component{
    state = {
        nama: '',
        telp: '',
        alamat: '',
        perusahaan: '',
    }

    sendData = async (props)=>{
        const { navigation } = this.props;
        if (!this.state.nama.trim()) {
            alert('Please Enter Nama');
        }
        else if(!this.state.telp.trim()){
            alert('Please Enter Telp');
        }
        else if(!this.state.alamat.trim()){
            alert('Please Enter Alamat');
        }
        else if(!this.state.perusahaan.trim()){
            alert('Please Enter Perusahaan');
        }
        else{
            fetch("http://mppk-app.herokuapp.com/send-data-client",{
                method:"POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                "perusahaan":this.state.perusahaan,
                "alamat":this.state.alamat,
                "nama":this.state.nama,
                "telp":this.state.telp
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(!data.error){
                    alert(data.nama+' Tersimpan')
                    navigation.replace("Dashboard")
                }
                else{
                    alert(data.error)
                }
            
            })
        }
        
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
            <View 
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'#039be5',
                    paddingVertical:10
                }}
                >
                <TouchableOpacity
                    style={{
                    backgroundColor:'#039be5',
                    width:40, height:40,
                    marginLeft:20
                    }}
                    onPress={()=>navigation.goBack()}
                >
                    <Icon name="arrow-left" size={30} color='white'/>
                </TouchableOpacity>
                <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}></Text>
            </View>

            <View style={{flex:1}}>
                <Text style={{
                    marginVertical:30, 
                    marginHorizontal:50, 
                    justifyContent:'center', 
                    textAlign:'center',
                    fontSize:20, fontWeight:'bold'}}
                    >
                        Input Data Client
                    </Text>
                <View>
                        <Input
                            placeholder='Nama'
                            value={this.state.nama}
                            onChangeText={(text)=>this.setState({nama:text})}
                            leftIcon={
                                <Icon
                                name='user'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='No. Telp'
                            value={this.state.telp}
                            onChangeText={(text)=>this.setState({telp:text})}
                            leftIcon={
                                <Icon
                                name='phone'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Alamat'
                            value={this.state.alamat}
                            onChangeText={(text)=>this.setState({alamat:text})}
                            leftIcon={
                                <Icon
                                name='map-marker'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Nama Perusahaan'
                            value={this.state.perusahaan}
                            onChangeText={(text)=>this.setState({perusahaan:text})}
                            leftIcon={
                                <Icon
                                name='building'
                                size={24}
                                color='black'
                                />
                            }
                        />

                    <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Tambah</Text>
                    </TouchableOpacity>
                </View>
            </View>

            </View>
        )
    }
}

// const AddClient = ({navigation},props) => {


//     const sendData = async (props)=>{
//         console.log(nama+' '+perusahaan+' '+telp+' '+alamat);
  
//         fetch("http://mppk-app.herokuapp.com/send-data-client",{
        
//           method:"POST",
//           headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//            "perusahaan":perusahaan,
//            "alamat":alamat,
//            "nama":nama,
//            "telp":telp
//          })
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             console.log(data)
//             if(!data.error){
//                 Alert.alert(data.nama+' Tersimpan')
//                 navigation.replace("Dashboard")
//                 console.log("sukses")
//             }
//             else{
//                 Alert.alert(data.error)
//             }
          
//         })
//      }

//   return(

//     );
//   };

  
  
const styles=StyleSheet.create({
    input: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,

        },
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#0d47a1',
        alignItems:'center',
    }
});
export default AddClient;


import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity,Alert } from 'react-native';
import {  TextInput } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';

class EditP extends Component{
    state = {
        img: [],
        data: [],
        email: '',
        nama: '',
        ktp: '',
        telp: '',
        status: '',
        password: '',
    }

    
    componentDidMount(){
        this.Boiler();
    }
    
    Boiler = async ()=>{
        const token = await AsyncStorage.getItem("token")
        fetch('http://mppk-app.herokuapp.com/',{
        headers:new Headers({
        Authorization:"Bearer "+token
        })
        }).then(res=>res.json())
        .then(data=>{
            this.setState({data:data})
            this.setState({img:{uri: 'http://mppk-app.herokuapp.com/'+data.image}})
            this.setState({nama:data.nama})
            this.setState({ktp:data.ktp})
            this.setState({telp:data.telp})
            this.setState({email:data.email})
        }
        )
    }
    
    sendData = async ()=>{
        const { navigation } = this.props;
        fetch("http://mppk-app.herokuapp.com/update-data-user",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    "fileData":'data:'+this.state.img.type+';base64,'+ [this.state.img.data],
                    "nama":this.state.nama,
                    "telp":this.state.telp,
                    "ktp":this.state.ktp,
                    "email":this.state.email,
                    "password":this.state.password,
                    "fileName":this.state.img.fileName,
                    "type":this.state.img.type,
                    "_id":this.state.data._id,
                    "image":this.state.data.image,
                    "aktif":'yes'
            })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(!data.error){
                  //  alert(data.m)
                    Alert.alert('Data berhasil di update')
                    navigation.goBack()
                    navigation.replace('AccountP')
                }
                else{
                    Alert.alert(data.error)
                }
            
            })
              
    }

    openGallery = async () => {
        const options = {
        
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            
            if(response.didCancel){
                console.log('User cancelled image picker');
            }
            else{
                this.setState({img:response})
            }
        })
    }

    render(){
        const { navigation } = this.props;
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
                
                <ScrollView>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        marginVertical:20,
                    }}>
                        {
                            this.state.data.image ?(
                                <Image
                                source={{ uri: this.state.img.uri }}
                                style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                            />
                            ):(
                                <Image
                                source={{ uri: this.state.img.uri }}
                                style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                            />
                            )
                        }
                    
                        <View
                                style={{ 
                                    height:50, 
                                    width:50,
                                    position: 'absolute',
                                    top: 80, left:240,
                                    }}
                            >
                                <TouchableOpacity onPress={()=>this.openGallery()} style={styles.fab}>
                                <Icon name="camera" size={20} color="white" ></Icon>
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            marginHorizontal:20
                        }}
                    >
                            
                        <Input
                            placeholder='Nama'
                            value ={this.state.nama}
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
                            placeholder='No. KTP'
                            value ={this.state.ktp}
                            disabled={true}
                            leftIcon={
                                <Icon
                                name='id-card'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='No. Telp'
                            value ={this.state.telp}
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
                            placeholder='Email'
                            value ={this.state.data.email}
                            disabled={true}   
                            leftIcon={
                                <Icon
                                name='envelope'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        
                        <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({password:text})}
                            leftIcon={
                                <Icon
                                name='lock'
                                size={24}
                                color='black'
                                />
                            }
                        />

                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Simpan</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </View>
        )
    }
}

  
  
const styles=StyleSheet.create({
    input: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,

        },
    inputarea: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,
        justifyContent: 'flex-start',
        height: 90,
        },
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#039be5',
        alignItems:'center',
    },
    fab: { 
        //   position: 'absolute', 
           width: 46, 
           height: 46, 
           alignItems: 'center', 
           justifyContent: 'center', 
           right: 20, 
           bottom: 20, 
           backgroundColor: '#039be5', 
           borderRadius: 30, 
           elevation: 8 , marginBottom:100
           }, 
});
export default EditP;


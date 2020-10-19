import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity,BackHandler } from 'react-native';
import {  TextInput } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';


const AccountP = ({navigation}) => {
const [img,setImg]= useState([])
const [data,setData]=useState([])
const [email,setEmail] = useState('');
const [password,setPassword]=useState('')
const [nama,setNama]=useState('')
const [ktp,setKtp]=useState('')
const [telp,setTelp]=useState('')
const [iduser,setIdUser]=useState('')


useEffect(()=>{
    Boiler();
  //  BackHandler.
  //  fetchData();
    //fetchDataDetail();
  },[])

  const Boiler = async ()=>{
    const token = await AsyncStorage.getItem("token")
     fetch('http://mppk-app.herokuapp.com/',{
     headers:new Headers({
       Authorization:"Bearer "+token
     })
     }).then(res=>res.json())
     .then(data=>{
     //  console.log(data._id)
       setIdUser(data._id)
       setData(data)
       setImg({uri: 'http://mppk-app.herokuapp.com/'+data.image})
       setNama(data.nama)
       setKtp(data.ktp)
       setTelp(data.telp)
       setEmail(data.email)
       setPassword(data.password)
     }
     )
    }
  
    const sendData = async ()=>{
        console.log(img.data)  
      //  console.log(name+' '+type)
        //console.log(response.data)
            const config = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "fileData":'data:'+img.type+';base64,'+ [img.data],
                "nama":nama,
                "telp":telp,
                "ktp":ktp,
                "email":email,
                "password":password,
                "fileName":img.fileName,
                "type":img.type,
                "_id":data._id,
                "image":data.image,
                
            }),
            };
            fetch("http://mppk-app.herokuapp.com/update-data-user", config)
            .then((checkStatusAndGetJSONResponse)=>{       
                navigation.replace('ListProjectP',{id:iduser})
            }).catch((err)=>{console.log(err)});

           
    }

const openGallery = async () => {
    const options = {
       
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      //  console.log('Response = ', response);
          
        if(response.didCancel){
            console.log('User cancelled image picker');
        }
        else{
           setImg(response)
        }
    })
}
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
                    data.image ?(
                        <Image
                        source={{ uri: img.uri }}
                        style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                    />
                    ):(
                        <Image
                        source={{ uri: img.uri }}
                        style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                    />
                    )
                }
                {/* {img && (
                    <Image
                        source={{ uri: img.uri }}
                        style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                    />
                )} */}
               
                {/* <View
                        style={{ 
                            height:50, 
                            width:50,
                            position: 'absolute',
                            top: 80, left:240,
                            }}
                    >
                        <TouchableOpacity onPress={()=>openGallery()} style={styles.fab}>
                        <Icon name="camera" size={20} color="white"></Icon>
                        </TouchableOpacity>
                </View> */}
              </View>
              <View
                style={{
                    marginHorizontal:20
                }}
              >
                 <View style={{backgroundColor:'#e3f2fd',paddingVertical:15}}>
                      <Text style={{fontSize:20,marginHorizontal:20}}>{nama}</Text>
                  </View>
                  <View style={{backgroundColor:'#e3f2fd',paddingVertical:15}}>
                      <Text style={{fontSize:20,marginHorizontal:20}}>{ktp}</Text>
                  </View>
                  <View style={{backgroundColor:'#e3f2fd',paddingVertical:15}}>
                      <Text style={{fontSize:20,marginHorizontal:20}}>{telp}</Text>
                  </View>
                  <View style={{backgroundColor:'#e3f2fd',paddingVertical:15}}>
                      <Text style={{fontSize:20,marginHorizontal:20}}>{email}</Text>
                  </View>
              </View>
              <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('EditP')}>
                  <Text style={{fontWeight:'bold'}}>Edit</Text>
              </TouchableOpacity>
          </ScrollView>
      </View>
    
    

      </View>
    );
  };

  
  
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
export default AccountP;


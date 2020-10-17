import { NavigationContainer } from '@react-navigation/native';
import React,{ useState,useEffect } from 'react';
import { Image,Text, View, TextInput,Alert, StyleSheet,BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation},props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('')
    const [status,setStatus]=useState('')
    
    
  useEffect(()=>{
    remove();
    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();

  },[])

    const remove =(props)=>{
        AsyncStorage.removeItem("token").then(()=>{
            console.log("remove token")
        })
    }

    console.log(AsyncStorage.getItem('token'))
    const sendCred = async (props)=>{
      fetch("http://mppk-app.herokuapp.com/signin",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "email":email,
         "password":password,
       })
      })
      .then(res=>res.json())
      .then(async (data)=>{
        if(!data.error){
            try {
                await AsyncStorage.setItem('token',data.token)
                    Boiler();
              } catch (e) {
                //console.log("error hai",e)
                 Alert(e)
              }
        }
        else{
            Alert.alert(data.error)
        }
        
      })
   }
 
   const Boiler = async ()=>{
    const token = await AsyncStorage.getItem("token")
    console.log(token)
     fetch('http://mppk-app.herokuapp.com/',{
     headers:new Headers({
       Authorization:"Bearer "+token
     })
     }).then(res=>res.json())
     .then(data=>{
      // console.log(data.id)
        if(data.status=='admin'){
            navigation.replace("Dashboard")
        }
        else if(data.status=='karyawan'){
            navigation.replace("ListProjectP",{id:data._id})
            console.log(data._id)
        }
        else if(data.status=='pm'){
            navigation.replace("ListProjectPM",{id:data._id})
        }
     }
     )
    }



    return(
        <View style={{flex:1}}>
            <View style={{
                //flex:1,
                backgroundColor:'#90caf9',
                height:250,
                alignItems:'center',
                justifyContent:'center',
            }}>
                <View style={{width:200,height:100}}>
                    <Image style={{height:70,width:180,}} 
                    source={require('../../../src/icons/login.png')}/>
                </View>
                 
            </View>
            <View style={{
                flex:1,
                backgroundColor:'#eee',
            }}>
                
            <View style={{
                backgroundColor:'white',
                marginHorizontal:20,
                marginTop:-50,
                borderRadius:20,
                paddingVertical:50,
                opacity:0.9

            }}>
                <View style={{
                    marginHorizontal:20,
                    marginTop:20
                }}>
                    <Input
                        placeholder='Email'
                        returnKeyType = "next"
                        keyboardType = "email-address"
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        onChangeText={(text) => setEmail(text)}
                        Value={email}
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
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='black'
                            />
                        }
                    />
                    
                    <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#0d47a1',borderRadius:25}}
                    onPress={()=> sendCred()}
                    >
                    <Text
                        style={{
                            fontSize:12,
                            fontWeight:'bold',
                            color: 'white',
                            textTransform: 'uppercase',
                            textAlign: 'center'
                        }}
                        >
                        Login
                    </Text>
                    </TouchableOpacity>
                </View>
                
                
            </View>
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
        backgroundColor:'#81c784',
        alignItems:'center',
    }
});
export default Login;
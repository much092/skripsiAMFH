import React, {Component,useState,useEffect} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import TabP from '../Tab/TabP';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';

const TeamAdmin = ({navigation,route},props) => {
    
const [listTeam,setListTeam]=useState([])
const [id,setId]=useState('')
const idproject = route.params.id;
const [dialogVisible,setdialogVisible]=useState(false)

useEffect(()=>{
    fetchDataTeam();
  },[])

 const fetchDataTeam = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataTeam/'+idproject)
    .then(res=>res.json())
    .then(data=>{
          setListTeam(data)
       //   setStatus(data.user.aktif)
       //   setLoading(false)
       //   console.log(data)
    })
  }
  const updateaktif = (text) =>{
    console.log(text)
    fetch("http://mppk-app.herokuapp.com/updateAktif",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
      },  
       body:JSON.stringify({
        "_id":id,
        "aktif":text
       })
      })
    .then(res=>res.json())
    .then(data=>{
        if(!data==[]){
            //console.log('nonull')
            navigation.replace('TeamAdmin',{id:idproject})
        }
        else{
           // console.log('null')
            console.log(data)
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
            Team Project
          </Text>
        </View>


      <View style={{ flex: 1 }}>
          {
            listTeam.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{uri:'http://mppk-app.herokuapp.com/'+l.user.image}} />
                <ListItem.Content>
                  <ListItem.Title>{l.user.nama}</ListItem.Title>
                  <ListItem.Subtitle>{l.user.status}</ListItem.Subtitle>
                  
                </ListItem.Content>
                    {
                        l.user.aktif === 'yes'?(
                            <TouchableOpacity  style={styles.btnupdate}  onPress={()=>{setdialogVisible(true),setId(l.user._id)}}>
                                <Icon name="check-circle" size={20} color='green'></Icon>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity  style={styles.btnupdate}  onPress={()=>updateaktif('yes',l.user._id)}>
                                <Icon name="times-circle" size={20} color='red'></Icon>
                            </TouchableOpacity>
                        )

                    }
                   
              </ListItem>
            ))
          }
          
      </View>
      <ConfirmDialog
              title="Alert !!!!"
              message="Apakah anda yakin ?"
              visible={dialogVisible}
              onTouchOutside={()=>setdialogVisible(false)}
              positiveButton={{
                  title: "YES",
                  onPress: () => updateaktif('no')
              }}
              negativeButton={{
                  title: "NO",
                  onPress: () => setdialogVisible(false)
              }}
          />
      
      </View>
    );
  };

  
const styles=StyleSheet.create({
    fab: { 
     //   position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        },
    
  btnupdate: { 
    //   position: 'absolute', 
       width: 36, 
       height: 36, 
       alignItems: 'center', 
       justifyContent: 'center',  
       backgroundColor: 'white', 
       borderRadius: 30, 
       elevation: 8,
       marginHorizontal:5
       }, 
});
export default TeamAdmin;

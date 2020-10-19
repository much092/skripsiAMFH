import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import SelectPicker from 'react-native-form-select-picker';



const TeamPM = ({navigation,route}) => {
  
  const [list,setList]=useState([])
  const [iduser,setIdUser]=useState()
  const [listPegawai,setListPegawai]=useState([])


  const sheetRef = React.createRef();
  const fall = new Animated.Value(0);
  const idproject = route.params.id;
  const [nama,setNama]= useState('')
  const [jumlah,setJumlah]=useState('')
  const [loading, setLoading] = useState(true);
  console.log(idproject)

     
  useEffect(()=>{
    fetchDataPegawai();
    fetchDataTeam();
    
  },[])

  const fetchDataPegawai = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataPegawai2')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setListPegawai(data)
        setLoading(false)
    })
  }
  
  const fetchDataTeam = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataTeam/'+idproject)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setList(data)
        setLoading(false)
    })
  }

  const sendData = async (props)=>{
  
   fetch("http://mppk-app.herokuapp.com/send-data-team",{
   
     method:"POST",
     headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "iduser":iduser,
      "idproject":idproject,
      "aktif":'yes'
    })
   })
   .then(res=>res.json())
   .then(data=>{
       console.log(data)
       if(!data.error){
          //  setListPegawai()
          setIdUser('')
           Alert.alert('Data Tersimpan')
           console.log(data)
       }
       else{
           Alert.alert(data.error)
       }
     
   })
  }

  const renderSeparatorView = () => {
    return (
      <View style={{
          height: 1, 
          width: "100%",
          backgroundColor: "#CEDCCE",
        }}
      />
    );
  };
  
  const renderItem = ({ item }) => (
    
    <Item 
    name={item.user.nama} 
    id= {item._id}
    status={item.user.status}
    img = {item.user.image}
    />
  );

  const Item = ({ id,name,img,status }) => (
    
    <TouchableOpacity >
    <View 
    style={{
          flexDirection:'row' ,
          borderBottomWidth:0,
          backgroundColor:'white',
          paddingVertical:10,
          paddingHorizontal:20,
          borderRadius:6,
          alignItems:'center',
  
    }}>
      <Avatar source={{uri:'http://mppk-app.herokuapp.com/'+img}}/>
      <View>
      
      <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{status}</Text>
      </View>
      
    </View>
    </TouchableOpacity>
  );
 
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Team</Text>
        </View>

        <View
      style={{
        backgroundColor: '#fff',
        padding: 16,
        height: 200,
        justifyContent:'center'
      }}
    >
      <View>
          <View style={{flexDirection:'row'}}>
             <SelectPicker
                        style={{flex:1,borderBottomWidth:1, borderBottomColor:'black', marginHorizontal:"3%", marginVertical:20}}
                        placeholder="Nama Pegawai"
                        onSelectedStyle={{fontSize: 20, color:'black',paddingLeft:10}}
                        placeholderStyle={{fontSize: 20, color:'black',}}
                        onValueChange={(value) => {
                            setIdUser(value);
                        }}
                        selected={iduser}
                        >
                        {Object.values(listPegawai).map((val, index) => (
                            <SelectPicker.Item label={val.nama} value={val._id} key={val._id} />
                        ))}

              </SelectPicker>
          </View>
              <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#0d47a1',borderRadius:25}}
                onPress={()=>{sendData()}}
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
                     Simpan
                    </Text>
              </TouchableOpacity>
        </View>
      </View>
  

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onRefresh={()=>fetchDataTeam()}
              refreshing={loading}
              ItemSeparatorComponent={renderSeparatorView}
        />
      
      </SafeAreaView> 
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
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        }
});
export default TeamPM;

import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView,Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';



const Module = ({navigation,route}) => {
  

  const sheetRef = React.createRef();
  const fall = new Animated.Value(0);
  const idproject = route.params.id;
  const [namaKP,setNamaKP]= useState('')

  const [list,setList]=useState([])
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchData();
    //Boiler();
    
  },[])
 
  const fetchData = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataModule/"+idproject)
    .then(res=>res.json())
    .then(data=>{
        setList(data)
        setLoading(false)
        console.log(data)
    })
 }
 const sendData = async (props)=>{
  
  fetch("http://mppk-app.herokuapp.com/send-data-module",{
  
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "kategori_pekerjaan":namaKP,
     "idproject":idproject,
   })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(!data.error){
         //  setListPegawai()
          Alert.alert('Data Tersimpan')
          console.log(data)
          navigation.replace('Module',{id:idproject})
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
    nama_kategori={item.kategori_pekerjaan} 
    id= {item._id}
    />
  );
  
  const Item = ({ id,nama_kategori }) => (
    
    <TouchableOpacity >
    <View 
    style={{
        flexDirection:'row' ,
        borderBottomWidth:0,
        backgroundColor:'white',
        paddingVertical:10,
        borderRadius:6,
        alignItems:'center',
  
    }}>
      <Avatar></Avatar>
      <View>
      
      <Text style={{fontSize:16, paddingLeft:10}}>{nama_kategori}</Text>
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Module</Text>
        </View>
        
        <View
          style={{
            backgroundColor: '#fff',
            padding: 16,
            height: '30%',
            justifyContent:'center'
          }}
        >
          <View>
                  <Input
                        placeholder='Nama Kategori Pekerjaan'
                        value={namaKP}
                        onChangeText={(text)=>setNamaKP(text)}
                        placeholderTextColor='black'
                        color='black'
                    />
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
              onRefresh={()=>fetchData()}
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
export default Module;

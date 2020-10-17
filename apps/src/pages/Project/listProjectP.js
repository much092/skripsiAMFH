import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import {  ScrollView, TextInput,TouchableHighlight } from 'react-native-gesture-handler';
import { Button, Overlay } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';


const ListProjectP = ({navigation,route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal,setModal] = useState(false)
 // const [id,setId] = useState('')
  const iduser= route.params.id
  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);
  const [idproject,setIdProject] = useState('')

  //console.log(iduser)
  useEffect(()=>{
    fetchData();
    //Boiler();
    
  },[])
 
  const fetchData = async (props)=>{
    console.log(iduser)
    fetch("http://mppk-app.herokuapp.com/getDataProjectByIdPegawai/"+iduser)
    .then(res=>res.json())
    .then(data=>{
      try{
        console.log(data)
      //   console.log(data)
         setList(data)
         setLoading(false)
      //   //console.log(list.length)
      // //  setList([{_id:'0'}])
      //   setLoading(false)
      //  // console.log(list)
      }
      catch(err){
        
      }
    })
 }
 const renderItem = ({ item }) => (
    
  <Item 
  name={item.project.nama} 
  id= {item.project._id}
  tglMulai={item.project.tglMulai}
  tglSelesai ={item.project.tglSelesai}
  namaC = {item.client.nama}
  alamat={item.client.alamat}
  idclient={item.client._id}
  idp={item.user._id}
  />
  );
 const Item = ({ id,name,tglMulai,tglSelesai,namaC,alamat,idclient,idp}) => (
    
  <TouchableOpacity onPress={()=>navigation.navigate('DetailProject',{id:id,idClient:idclient,idp:idp})}>
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
    
    <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{tglMulai}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{tglSelesai}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{namaC}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{alamat}</Text>
    
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
            paddingVertical:10,justifyContent:'space-between'
          }}
        >
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Project</Text>
          <TouchableOpacity
            style={{
              backgroundColor:'#039be5',
              width:40, height:40,
              marginLeft:0,
            }}
            onPress={()=>setModalVisible(true)}
          >
            <Icon name="ellipsis-v" size={40} color='white'/>
          </TouchableOpacity>
        </View>
        
      <View>
          <TextInput 
            placeholder="Search..."
                style={{
                    borderWidth:1,
                    borderColor: 'black',
                    borderRadius: 28,
                    marginHorizontal: 10,
                    marginVertical:10,
                    paddingHorizontal:23
                }}
          >
          </TextInput>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
      
      {
      list.length > 0 ? (
        <FlatList
                  data={list}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                  onRefresh={()=>fetchData()}
                  refreshing={loading}
            />
      ):(
        <Text>Belum Memiliki Project</Text>
      )
    }
          
          
          <Overlay isVisible={modalVisible} 
                    backdropStyle={{opacity:0}}
                  overlayStyle={styles.modalView}
                  onBackdropPress={setModalVisible}>
            
            <TouchableOpacity style={styles.btnoverlay} onPress={()=>{navigation.navigate('AccountP'),setModalVisible(false)}}>
                <Text style={styles.textStyle}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnoverlay} onPress={()=>{navigation.replace('Login'),setModalVisible(false)}}>
                <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
          </Overlay>
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
        },
    centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    marginLeft:'40%',marginBottom:'120%',
    width:200,
    height:100,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    justifyContent:'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  btnoverlay:{
    backgroundColor:'white',height:30,width:100,justifyContent:'center',
    marginVertical:5
  }
});
export default ListProjectP;

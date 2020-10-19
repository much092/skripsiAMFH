import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';


const DetailAlat = ({navigation,route}) => {

const [img,setImg]= useState([])
const [data,setData]=useState([])
const [nama,setNama]=useState('')
const [jumlah,setJumlah]=useState('')
const [deskripsi,setDeskripsi]=useState('')
const [list,setList]=useState([])
const idalat = route.params.idalat
const idproject = route.params.id;
const [modalVisible, setModalVisible] = useState(false);
const [dialogVisible,setdialogVisible]=useState(false)


useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataAlatById/'+idalat)
    .then(res=>res.json())
    .then(data=>{
        setNama(data.nama)
        setJumlah(data.jml)
        setDeskripsi(data.deskripsi)
    })
 }

 const deleteData = async (props) =>{
 
  fetch('http://mppk-app.herokuapp.com/deleteAlat/'+idalat)
  .then(res=>res.json())
  .then(data=>{
      if(!data.error){
          Alert.alert(data.message+'!!!'+'\n'+"Swipe down untuk refresh")
          setdialogVisible(false)
          
      }
      else{
          Alert.alert(data.error)
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Alat</Text>
      </View>

     
      <View style={{flex:1}}>
               
          <ScrollView>
             
              <View
                style={{
                    marginHorizontal:20
                }}
              >
                <View style={{backgroundColor:'white',borderRadius:12,marginVertical:20}}>
                <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Nama Alat</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{nama}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>NO Telp</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{jumlah} </Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Alamat</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{deskripsi}</Text>
                      </View>
                </View>
                
              </View>
              <View style={{
                    marginHorizontal:20, alignItems:'center',flexDirection:'row'
                }}>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditAlat',{idalat:idalat,id:idproject})}} style={styles.btnupdate}>
                        <Icon name="edit" size={20} color="white"></Icon>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {setdialogVisible(true)}} style={styles.btnupdate}>
                        <Icon name="trash" size={20} color="white"></Icon>
                    </TouchableOpacity> 
                </View>
          </ScrollView>
          
      </View>
    
      <Overlay isVisible={modalVisible} 
                    backdropStyle={{opacity:0}}
                  overlayStyle={styles.modalView}
                  onBackdropPress={setModalVisible}>
            
            <TouchableOpacity style={styles.btnoverlay} onPress={()=>updatejabatan('karyawan')}>
                <Text style={styles.textStyle}>Pekerja</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnoverlay} onPress={()=>{updatejabatan('pm')}}>
                <Text style={styles.textStyle}>Mandor</Text>
            </TouchableOpacity>
          </Overlay>
          <ConfirmDialog
              title="Alert !!!!"
              message="Apakah anda yakin ?"
              visible={dialogVisible}
              onTouchOutside={()=>setdialogVisible(false)}
              positiveButton={{
                  title: "YES",
                  onPress: () => deleteData()
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
    btnupdate: { 
     //   position: 'absolute', 
        width: '50%', 
        height: 36, 
        alignItems: 'center', 
        justifyContent: 'center',  
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8,
        marginHorizontal:5,marginVertical:20
        }, 

    
  modalView: {
  //  marginLeft:'40%',marginBottom:0,
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
  },
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,
    marginHorizontal:20,width:'25%'
  },
  titikdua: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5
  },
  subtext: {
    color: "grey",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,marginLeft:5
  },
});
export default DetailAlat;


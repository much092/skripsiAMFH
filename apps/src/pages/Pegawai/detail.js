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


const DetailPegawai = ({navigation,route}) => {

const [img,setImg]= useState([])
const [data,setData]=useState([])
const [email,setEmail] = useState('');
const [status,setStatus]=useState('')
const [nama,setNama]=useState('')
const [ktp,setKtp]=useState('')
const [telp,setTelp]=useState('')
const [list,setList]=useState([])
const [jabatan,setJabatan]=useState(route.params.status)
const idpegawai = route.params.id;
const [modalVisible, setModalVisible] = useState(false);
const [dialogVisible,setdialogVisible]=useState(false)

//console.log(jabatan)

useEffect(()=>{
    fetchDataDetail();
    if(jabatan=='karyawan'){
        fetchDataProjectPegawai();
    }
    else if(jabatan=='pm'){
        fetchDataProjectPM();
    }
  },[])

  
 const fetchDataDetail = ()=>{
    fetch('http://mppk-app.herokuapp.com/getDataDetailPegawai/'+idpegawai)
    .then(res=>res.json())
    .then(data=>{
       setImg({uri: 'http://mppk-app.herokuapp.com/'+data.image})
       setNama(data.nama)
       setKtp(data.ktp)
       setTelp(data.telp)
       setEmail(data.email)
       setStatus(data.aktif)
       console.log(data.aktif)
    })
  }
  const fetchDataProjectPegawai = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataProjectByIdP",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
      },  
       body:JSON.stringify({
        "iduser":idpegawai,
       })
      })
    .then(res=>res.json())
    .then(data=>{
        if(!data==[]){
            //console.log('nonull')
            setList(data)
        }
        else{
           // console.log('null')
            setList({_id:null})
        }
    })
 }
 const fetchDataProjectPM = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataProjectById",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
      },  
       body:JSON.stringify({
        "iduser":idpegawai
       })
      })
    .then(res=>res.json())
    .then(data=>{
        if(!data==[]){
            //console.log('nonull')
            setList(data)
        }
        else{
           // console.log('null')
            setList({_id:null})
        }
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
        "_id":idpegawai,
        "aktif":text
       })
      })
    .then(res=>res.json())
    .then(data=>{
        if(!data==[]){
            //console.log('nonull')
            setStatus(text)
        }
        else{
           // console.log('null')
            console.log(data)
        }
    })
 }
 
 const deleteData = async (props) =>{
    console.log(idpegawai)
   fetch('http://mppk-app.herokuapp.com/deletePegawai/'+idpegawai)
   .then(res=>res.json())
   .then(data=>{
       if(!data.error){
           Alert.alert(data.message)
           setdialogVisible(false)
           navigation.replace('Dashboard')
       }
       else{
           Alert.alert(data.error)
       }
   })
  }

 const updatejabatan = (text) =>{
    console.log(text)
    fetch("http://mppk-app.herokuapp.com/updateJabatan",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
      },  
       body:JSON.stringify({
        "_id":idpegawai,
        "status":text
       })
      })
    .then(res=>res.json())
    .then(data=>{
        if(!data==[]){
            //console.log('nonull')
            setJabatan(text)
            setModalVisible(false)
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Pegawai</Text>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      {
                        status === 'no' || status === undefined ?(
                            <TouchableOpacity style={{
                                                    width:90,height:30,
                                                    backgroundColor:'red',
                                                    marginHorizontal:20,
                                                    marginTop:20,alignItems:'center',
                                                    justifyContent:'center'
                                                    }}
                                                onPress={()=>updateaktif('yes')}
                                                    >
                            <Text style={{color:'white',fontWeight:'bold'}}>Tidak Aktif</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity style={{
                                            width:90,height:30,
                                            backgroundColor:'green',
                                            marginHorizontal:20,
                                            marginTop:20,alignItems:'center',
                                            justifyContent:'center'
                                            }}
                                            onPress={()=>updateaktif('no')}
                                >
                            <Text style={{color:'white',fontWeight:'bold'}}>Aktif</Text>
                            </TouchableOpacity>
                                            )
                }
                <View>
                    {
                        status === 'no' || status === undefined ?(
                            <TouchableOpacity style={{
                                width:90,height:30,
                                backgroundColor:'green',
                                marginHorizontal:20,
                                marginTop:20,alignItems:'center',
                                justifyContent:'center'
                                }}
                                onPress={()=>setModalVisible(true)}
                                disabled='true'
                    >
                    {
                        jabatan==='karyawan'?(
                            <Text style={{color:'white',fontWeight:'bold'}}>Pekerja</Text>
                        ):(
                            <Text style={{color:'white',fontWeight:'bold'}}>Mandor</Text>
                        )
                    }
                </TouchableOpacity>
                        ):(
                            <TouchableOpacity style={{
                                width:90,height:30,
                                backgroundColor:'green',
                                marginHorizontal:20,
                                marginTop:20,alignItems:'center',
                                justifyContent:'center'
                                }}
                                onPress={()=>setModalVisible(true)}
                    >
                    {
                        jabatan==='karyawan'?(
                            <Text style={{color:'white',fontWeight:'bold'}}>Pekerja</Text>
                        ):(
                            <Text style={{color:'white',fontWeight:'bold'}}>Mandor</Text>
                        )
                    }
                </TouchableOpacity>
                        )
                    }
                            
                </View>
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
               
              </View>
              <View
                style={{
                    marginHorizontal:20
                }}
              >
                <View style={{alignItems:'center',backgroundColor:'white',borderRadius:12,marginVertical:20}}>
                <Text style={{fontSize:20,marginVertical:5}}>{nama}</Text>
                <Text style={{fontSize:20,marginVertical:5}}>{ktp}</Text>
                <Text style={{fontSize:20,marginVertical:5}}>{telp}</Text>
                <Text style={{fontSize:20,marginVertical:5}}>{email}</Text>
                </View>
                
                <View style={{alignItems:'center',backgroundColor:'white',borderRadius:12}}>
                        <Text style={{fontSize:20,marginVertical:5}}>Project</Text>
                    {
                        list.map((l)=>(
                            l._id === null ?(
                                <Text style={{fontSize:20,marginVertical:5}}>Belum Memiliki Project</Text>
                            ):(
                                <Text style={{fontSize:20,marginVertical:5}}>{l.project.nama}</Text>
                            )
                        ))
                    }
                      
                    
                </View>  
                

              </View>
              <View style={{
                    marginHorizontal:20, alignItems:'center'
                }}>
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
        marginHorizontal:5
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
  }
});
export default DetailPegawai;


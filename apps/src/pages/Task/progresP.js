import React, {Component, useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import Animated from 'react-native-reanimated';



const  ProgressP = ({navigation,route}) => {
  
const [status, setStatus] = useState('');
const [idTask, setIdTask] = useState('');
const [list,setList]=useState([])
const [listTask,setListTask]=useState([])
const idproject = route.params.id;
const idpegawai = route.params.idp;
const [loading, setLoading] = useState(true);
const [modalVisible, setModalVisible] = useState(false);
console.log(idproject)

useEffect(()=>{
  fetchData();
 fetchDataTask();
  
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
const fetchDataTask= async (props)=>{
  fetch("http://mppk-app.herokuapp.com/getDataTask/"+idproject+"/"+idpegawai)
  .then(res=>res.json())
  .then(data=>{
      setListTask(data)
      setLoading(false)
  })
}
const sendDataDone = async (props)=>{
  console.log(idTask+' '+"done")
  fetch("http://mppk-app.herokuapp.com/update-data-task",{
  
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "_id":idTask,
     "status":"done",
   })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(!data.error){
         //  setListPegawai()
          setModalVisible(false)
          Alert.alert('Status task berhasil dirubah')
         // setLoading(true)
          setStatus('done')
         forceUpdate();
          console.log(data)
      }
      else{
          Alert.alert(data.error)
      }
    
  })
 }
 

const sendDataInProgress = async (props)=>{
  console.log(idTask+' '+"done")
  fetch("http://mppk-app.herokuapp.com/update-data-task",{
  
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "_id":idTask,
     "status":"In Progress",
   })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(!data.error){
         //  setListPegawai()
          setModalVisible(false)
          Alert.alert('Status task berhasil dirubah')
         // setLoading(true)
          setStatus('done')
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
  name={item.kategori_pekerjaan} 
  />
  );



  const Item = ({ id,name }) => (
    <View>
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
      
      <View>
        <Text style={{fontSize:16, paddingLeft:10,fontWeight:'bold'}}>{name}</Text>
          {
            listTask.map((l)=>(
              <View >
          { l.module.kategori_pekerjaan === name ? (
            <View style={{
              
            }}>
              
       <TouchableOpacity  
              onPress={()=>{setModalVisible(true);setIdTask(l._id)}}
              style={{
                      backgroundColor:'black',
                      flexDirection:'row' ,
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      backgroundColor:'white',
                      paddingVertical:10,
                      borderRadius:6,
                      alignItems:'center',
                                }}>
              <View style={{width:'5%'}}>
              
              </View>
              <View style={{width:'100%',}}>
                <View style={{borderBottomWidth:0.5}}>
                  <Text style={{fontSize:16, paddingLeft:10, }}>Nama Task</Text>
                  <Text style={{fontSize:16, paddingLeft:20, }}>{l.nama_task}</Text>
                </View>
                <View style={{borderBottomWidth:0.5}}>
                  <Text style={{fontSize:16, paddingLeft:10, }}>Spesifikasi</Text>
                  <Text style={{fontSize:16, paddingLeft:20, }}>{l.spesifikasi}</Text>
                </View>
                
                <View style={{borderBottomWidth:0.5}}>
                  <Text style={{fontSize:16, paddingLeft:10, }}>Tanggal Mulai</Text>
                  <Text style={{fontSize:16, paddingLeft:20, }}>{l.tglMulai}</Text>
                </View>
                <View style={{borderBottomWidth:0.5}}>
                  <Text style={{fontSize:16, paddingLeft:10, }}>Tanggal Selesai</Text>
                  <Text style={{fontSize:16, paddingLeft:20, }}>{l.tglSelesai}</Text>
                </View>
                <View style={{borderBottomWidth:0.5}}>
                  <Text style={{fontSize:16, paddingLeft:10, }}>Nama Pegawai</Text>
                  <Text style={{fontSize:16, paddingLeft:20, }}>{l.user.nama}</Text>
                </View>
                <View style={{borderBottomWidth:0 }}>
                  <Text style={{fontSize:16, paddingLeft:10, }}>Status</Text>
                  {
                    l.status==='none'?(
                      <Text style={{fontSize:16, paddingLeft:20,fontWeight:'bold' }}>Belum dikerjakan</Text>
                    ):(
                      <Text style={{fontSize:16, paddingLeft:20,fontWeight:'bold' }}>{l.status} 
                      {l.approved === 'ok' ? (
                        <Icon name="check" size={20} color="#0d47a1" style={{paddingLeft:40}}></Icon> 
                        ):(
                          <Icon name="" size={23}></Icon> 
                        )}
                      </Text>
                    )
                  }
                 
                  
                  
                </View>
                {/* <Text style={{fontSize:16, paddingLeft:10, }}>Nama Task: {l.nama_task}</Text>
             
                <Text style={{fontSize:16, paddingLeft:10, }}>Spesifikasi: {l.spesifikasi}</Text>
              
                <Text style={{fontSize:16, paddingLeft:10, }}>Tanggal Mulai: {l.tglMulai}</Text>
              
                <Text style={{fontSize:16, paddingLeft:10, }}>Tanggal Selesai: {l.tglSelesai}</Text>
                <Text style={{fontSize:16, paddingLeft:10, }}>Nama Pegawai: {l.user.nama}</Text>
                
                <Text style={{fontSize:16, paddingLeft:10,fontWeight:'bold',}}>Status: {l.status}</Text> */}
              </View>
             
        </TouchableOpacity>        
            </View>          
                   ):(
                         <></>
                   )
          }
          
        </View>  
            ))
          }
        </View>
     
    </View>
  </View>

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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
            Progress
          </Text>
        </View>

        <View style={{ flex: 1 }}>
                
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    onRefresh={()=>fetchDataTask()}
                    refreshing={loading}
                    ItemSeparatorComponent={renderSeparatorView}
              />
            
              <Overlay isVisible={modalVisible} 
                        backdropStyle={{opacity:0}}
                      overlayStyle={styles.modalView}
                      onBackdropPress={setModalVisible}>
                
                <TouchableOpacity style={styles.btnoverlay} onPress={()=>sendDataInProgress()}>
                    <Text style={styles.textStyle}>In Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnoverlay} onPress={()=>{sendDataDone()}}>
                    <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </Overlay>
            </SafeAreaView> 
            
            
        </View>
          
        
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
    header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  modalView: {
   // marginLeft:'40%',marginBottom:'120%',
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

export default  ProgressP;

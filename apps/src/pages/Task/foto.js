import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView,Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input,Overlay } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import SelectPicker from 'react-native-form-select-picker';
import ImagePicker from 'react-native-image-picker'

const FotoTask = ({navigation,route}) => {
  const [listTask,setListTask]=useState([])
  const [list,setList]=useState([])
  const [idTask, setIdTask] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [name,setName] = useState('')
  const [img,setImg]= useState([])
  const [img2,setImg2]= useState()
  const idproject = route.params.id;
  const idpegawai = route.params.idp;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(idproject)

  useEffect(()=>{
    fetchData();
    fetchDataTask();
    
  },[])
 
const fetchDataTask= async (props)=>{
  fetch("http://mppk-app.herokuapp.com/getDataTask/"+idproject+'/'+idpegawai)
  .then(res=>res.json())
  .then(data=>{
      setListTask(data)
      console.log(data)
  })
}
const fetchData= async (props)=>{
  fetch("http://mppk-app.herokuapp.com/getDataFotoTask/"+idproject)
  .then(res=>res.json())
  .then(data=>{
      setList(data)
      setLoading(false)
  })
}

const sendData = async (props)=>{
  fetch("http://mppk-app.herokuapp.com/send-data-fototask",{
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "fileData":'data:'+img.type+';base64,'+ [img.data],
     "fileName":img.fileName,
     "type":img.type,
     "idtask":idTask,
     "deskripsi":deskripsi,
     "idproject":idproject,
   })
  })
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
    try {
        Alert.alert('data tersimpan')
        setName('')
        setDeskripsi('')
        setIdTask('')
        navigation.replace('FotoTask',{id:idproject,idp:idpegawai})
      } catch (e) {
        console.log("error hai",e)
         Alert(e)
      }
  })
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
         setName(response.fileName)
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
  name={item.task.nama_task} 
  id={item._id}
  deskripsi={item.deskripsi}
  file={item.image}
  />
);

const Item = ({ deskripsi,name,file }) => (

  
  <TouchableOpacity  style={{backgroundColor:'grey', }} onPress={()=>{setModalVisible(false),setImg2(file)}}>
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
    
    <Avatar source={{uri:'http://mppk-app.herokuapp.com/'+file}}/>
    <View>
    
    <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
    <Text style={{paddingLeft:10,color:'grey'}}>{deskripsi}</Text>
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
              paddingVertical:10,
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Foto Task</Text>
            
          </View>
          
        <View style={{flex:1,marginHorizontal:0,marginVertical:10,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',marginHorizontal:20,height:50,alignItems:'center'}}>
              <Text style={{fontSize:20}}>File</Text>
              <TextInput style={{
                      borderWidth:1,marginLeft:'18%',height:40,width:'60%',justifyContent:'center'}}
                      value ={name}
              >

              </TextInput>
              <TouchableOpacity onPress={()=>openGallery()}
                                style={{
                                      backgroundColor:'#0d47a1',
                                      width:30,height:30,
                                      marginLeft:10,borderRadius:10,
                                      justifyContent:'center',alignItems:'center',

              }}>
                 <Icon name="paperclip" size={20} color="white"></Icon>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',marginHorizontal:20,height:50,alignItems:'center'}}>
              <Text style={{fontSize:20}}>Nama</Text>
              <SelectPicker
                        style={{flex:1,borderBottomWidth:1, borderBottomColor:'#bdbdbd',marginLeft:"12%",width:'20%'}}
                        placeholder="Task"
                        onSelectedStyle={{fontSize: 20, color:'black',paddingLeft:10}}
                        placeholderStyle={{fontSize: 20, color:'black',}}
                        onValueChange={(value) => {
                            setIdTask(value);
                        }}
                        selected={idTask}
                        >
                        {Object.values(listTask).map((val, index) => (
                            <SelectPicker.Item label={val.nama_task} value={val._id} key={val._id} />
                        ))}

              </SelectPicker>
            </View>

            <View style={{flexDirection:'row',marginHorizontal:20,height:50,alignItems:'center'}}>
              <Text style={{fontSize:20}} >Deskripsi</Text>
              <TextInput style={{
                      borderWidth:1,marginLeft:'5%',height:40,width:'60%'}}
                      
                    value ={deskripsi}
                    onChangeText={(text)=>setDeskripsi(text)}
              >

              </TextInput>
            </View>
            <View>
              <TouchableOpacity style={styles.btn} onPress={()=>sendData()} >
                  <Text style={{fontWeight:'bold',color:'white'}}>Simpan</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{marginVertical:10}}>
              <FlatList
                renderItem={renderItem}
                onRefresh={()=>fetchData()}
                refreshing={loading}
                data={list}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparatorView}
              />
            </ScrollView>
            <Overlay isVisible={modalVisible} 
                        backdropStyle={{opacity:0}}
                      overlayStyle={styles.modalView}
                      onBackdropPress={setModalVisible}>
                <Image
                        source={{ uri: 'http://mppk-app.herokuapp.com/'+img2 }}
                        style={{height:'100%',width:'100%',backgroundColor:'white'}}
                    />
              </Overlay>
        </View>
       </View>
      );
}

const styles=StyleSheet.create({
    modalView:{
      backgroundColor:"#bbdefb",
      marginVertical:250,
     // borderWidth:2,
      borderRadius:14,
      marginHorizontal:15
  }, 
  btn:{
    marginVertical:10,
    borderRadius:20,
    paddingVertical:10,
    marginHorizontal:100,
    backgroundColor:'#0d47a1',
    alignItems:'center',
},
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
  modalButtonView:{
      //marginBottom:10,
       paddingHorizontal:20,
       paddingVertical:5,
       color:"#000"
  },
  modalView: {
    // marginLeft:'40%',marginBottom:'120%',
     width:'80%',
     height:'80%',
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
  });
export default FotoTask;

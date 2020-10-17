import React, {Component, useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ListItem, Overlay } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';



const Feedback = ({navigation,route}) => {
  
const [feedback, setFeedback] = useState('');
const [idTask, setIdTask] = useState('');
const [idUser, setIdUser] = useState('');
const [list,setList]=useState([])
const [listTask,setListTask]=useState([])
const idproject = route.params.id;
const [loading, setLoading] = useState(true);
const [modalVisible, setModalVisible] = useState(false);


const sheetRef = React.createRef();
const fall = new Animated.Value(1);

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
  fetch("http://mppk-app.herokuapp.com/getDataTask/"+idproject)
  .then(res=>res.json())
  .then(data=>{
      setListTask(data)
      setLoading(false)
  })
}

const sendData = async (props)=>{
  console.log(idTask+' '+idUser+' '+feedback)
  fetch("http://mppk-app.herokuapp.com/send-data-feedback",{
  
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     
     "feedback":feedback,
     "idtask":idTask,
     "iduser":idUser
   })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(!data.error){
         //  setListPegawai()
          Alert.alert('Sukses')
          //console.log(data)
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

 const renderContent = () => (
  <View
    style={{
      backgroundColor: '#0d47a1',
      padding: 16,
      height: 300,
      justifyContent:'center'
    }}
  >
    <View>
            <Input
                  placeholder='Feedback'
                  value={feedback}
                  onChangeText={(text)=>setFeedback(text)}
                  placeholderTextColor='white'
                  color='white'
              />
            <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#e3f2fd',borderRadius:25}}
              onPress={()=>{sendData(),sheetRef.current.snapTo(1)}}
                  >
                  <Text
                      style={{
                          fontSize:12,
                          fontWeight:'bold',
                          color: 'black',
                          textTransform: 'uppercase',
                          textAlign: 'center'
                      }}
                      >
                   Simpan
                  </Text>
            </TouchableOpacity>
    </View>
  </View>
);

const renderHeader=()=>{
  <View style={styles.header}>
  <View style={styles.panelHeader}>
    <View style={styles.panelHandle} />
  </View>
  </View>
}



  const renderItem = ({ item }) => (
    
  <Item 
  name={item.nama_task} 
  id= {item._id}
  iduser={item.iduser}
  status={item.status}
  approved={item.approved}
  modul={item.module.kategori_pekerjaan}
  tglMulai = {item.tglMulai}
  tglSelesai = {item.tglSelesai}
  />
  );



  const Item = ({ id,name,status,approved,modul,tglMulai,tglSelesai,iduser }) => (
    <View>
    <TouchableOpacity onPress={()=>{sheetRef.current.snapTo(0),setIdTask(id),setIdUser(iduser)}}>
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
      
      <Text style={{fontSize:16, paddingLeft:10,fontWeight:'bold'}}>{modul}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>tgl mulai :{tglMulai}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>tgl selesai:{tglSelesai}</Text>
      {
        status==='none'?(
          <></>
        ):(
          <Text style={{fontSize:16, paddingLeft:10,fontWeight:'bold'}}>status:{status}</Text>
        )
      }
      {
        approved==='ok'?(
          <Text style={{fontSize:16, paddingLeft:10,fontWeight:'bold'}}>approved</Text>
        ):(
          <></>
        )
      }
      </View>
    </View>
    </TouchableOpacity>
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
           Feedback
          </Text>
        </View>

        <View style={{ flex: 1 }}>
        
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                    data={listTask}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    onRefresh={()=>fetchData()}
                    refreshing={loading}
                    ItemSeparatorComponent={renderSeparatorView}
              />
            
              <Overlay isVisible={modalVisible} 
                        backdropStyle={{opacity:0}}
                      overlayStyle={styles.modalView}
                      onBackdropPress={setModalVisible}>
                
                <TouchableOpacity style={styles.btnoverlay} onPress={()=>sendData()}>
                    <Text style={styles.textStyle}>Approve</Text>
                </TouchableOpacity>
              </Overlay>
            </SafeAreaView> 
            
            <BottomSheet
                ref={sheetRef}
                snapPoints={[300,0]}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                borderRadius={20}
                renderContent={renderContent }
                renderHeader={renderHeader}
              />
            
            
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

export default Feedback;

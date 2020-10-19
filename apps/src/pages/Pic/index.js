import React, {Component,useState,useEffect} from 'react';
import { Image, FlatList, StyleSheet, Text, View, RefreshControl,Card, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, SearchBar,Overlay,Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Moment from 'moment';

import img from '../../../src/icons/project.png';

const Pic = ({navigation}) => {
  const [idProject,setIdProject] = useState("")
  const [idUser,setIdUser] = useState("")
  const [feedback, setFeedback] = useState('');
  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    fetchData();
    
  },[])
 
  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataPic')
    .then(res=>res.json())
    .then(data=>{
        setList(data)
        setLoading(false)
        setFilteredDataSource(data);
        setMasterDataSource(data);
    })
 }

 const sendData = async (props)=>{
  console.log(idProject+' '+idUser+' '+feedback)
  fetch("http://mppk-app.herokuapp.com/send-data-feedback2",{
  
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "date":Moment(Date.now()).format('DD-MM-YYYY'),
     "feedback":feedback,
     "idproject":idProject,
     "iduser":idUser
   })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(!data.error){
         //  setListPegawai()
         setFeedback('')
         setModalVisible(false)
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

 const searchFilterFunction = text => {    
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = masterDataSource.filter(
      function (item) {
        const itemData = item.user.nama
          ? item.user.nama.toUpperCase() 
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(masterDataSource);
    setSearch(text);
  }  
};

  const renderItem = ({ item }) => (
    
    <Item 
    name={item.user.nama} 
    iduser={item.user._id} 
    idproject ={item.project._id}
    project={item.project.nama}
    />
  );

  const Item = ({ project,name,idproject,iduser }) => (
    <TouchableOpacity onPress={()=>{setModalVisible(true),setIdProject(idproject),setIdUser(iduser)}}>
    <View 
    style={{
        flexDirection:'row' ,
        borderBottomWidth:0,
        backgroundColor:'white',
        paddingVertical:10,
        borderRadius:6,
        alignItems:'center',
        marginHorizontal:0

    }}>
      <Avatar source={img} ></Avatar>
      <View>
                  <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Nama Project</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{project}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Penanggung Jawab</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{name} </Text>
                      </View>
        
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
            onPress={()=>navigation.toggleDrawer()}
          >
            <Icon name="bars" size={40} color='white'/>
          </TouchableOpacity>
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Pic</Text>
        </View>
      <View>
        <SearchBar        
            placeholder="Type Here..."        
            lightTheme        
            round    
            value={search}   
            onChangeText={text => searchFilterFunction(text)}
            autoCorrect={false}             
          /> 
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
                renderItem={renderItem}
                onRefresh={()=>fetchData()}
                refreshing={loading}
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparatorView}
          />
          <Overlay isVisible={modalVisible} 
                        backdropStyle={{opacity:0}}
                      overlayStyle={styles.modalView}
                      onBackdropPress={setModalVisible}>
                <Input
                    placeholder='Feedback'
                    value={feedback}
                    onChangeText={(text)=>setFeedback(text)}
                    style={{width:'100%'}}
                    
                />
                <TouchableOpacity style={styles.btnoverlay} onPress={()=>sendData()}>
                    <Text style={styles.textStyle}>submit</Text>
                </TouchableOpacity>
              </Overlay>
      </SafeAreaView>
        
      <View
            style={{ 
                height:100, 
                width:100,
                position: 'absolute',
                top: '90%', left:'85%',
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('AddPic')} style={styles.fab}>
              <Text style={styles.fabIcon}>+</Text>
              
              </TouchableOpacity>
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
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        },
    
  modalView: {
   // marginLeft:'40%',marginBottom:'120%',
    width:'80%',
    height:'30%',
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  btnoverlay:{
    backgroundColor:'blue',height:30,width:100,justifyContent:'center',
    marginVertical:5,
    borderRadius:12
  },
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,
    marginHorizontal:20,width:'35%'
  },
  titikdua: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0
  },
  subtext: {
    color: "grey",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,marginLeft:5,width:'50%'
  },
});
export default Pic;

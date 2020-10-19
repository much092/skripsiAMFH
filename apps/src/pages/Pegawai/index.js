import React, {Component,useState,useEffect} from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, Text, View, RefreshControl,Card, 
          Alert, BackHandler } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, Overlay, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';




const Pegawai = ({navigation},props) => {
  const [idpegawai,setIdPegawai] = useState("")
  const [email,setEmail] = useState("")
  const [listdetail,setListDetail]=useState([])
  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [dialogVisible,setdialogVisible]=useState(false)

  useEffect(()=>{
    fetchData();
   // BackHandler.removeEventListener('hardwareBackPress', backPressed);
    //fetchDataDetail();
  },[])
  const  backPressed = ({navigation}) => {
      navigation.goBack();
      return true;
  }
  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataPegawai')
    .then(res=>res.json())
    .then(data=>{
        setFilteredDataSource(data);
        setMasterDataSource(data);
        setLoading(false)
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
        const itemData = item.nama
          ? item.nama.toUpperCase()
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
    name={item.nama} 
    id={item._id}
    title={item.status}
    img ={item.image}
    email = {item.email}
    />
  );

  const Item = ({ title,name,id,img,email }) => (
  
    <TouchableOpacity onPress={() => {navigation.navigate('DetailPegawai',{id:id,status:title})}} >
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
      
      <Image source={{uri:'http://mppk-app.herokuapp.com/'+img}} style={{width:50,height:50,borderRadius:25}}></Image>
      <View style={{width:'70%'}}>
      
      <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      <Text style={{paddingLeft:10,color:'grey'}}>{email}</Text>
      <Text style={{paddingLeft:10,color:'grey'}}>{title}</Text>
      </View>
      {/* <View style={{flexDirection:'row-reverse',justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={() => {setdialogVisible(true),setIdPegawai(id)}} style={styles.btnupdate}>
              <Icon name="trash" size={20} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('DetailPegawai',{id:id,status:title})}} style={styles.btnupdate}>
              <Icon name="edit" size={20} color='white'></Icon>
          </TouchableOpacity>
      </View> */}
      
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Pegawai</Text>
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
                <View>
              {
                list.map((l)=>(
                  <View>
                    {
                      l._id == idpegawai ? (
                        <Text>{l.nama}</Text>
                      ):(
                        <></>
                      )
                    }
                  </View>
                ))
              }
              </View>
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
              <TouchableOpacity onPress={() => navigation.navigate('AddPegawai')} style={styles.fab}>
              <Text style={styles.fabIcon}>+</Text>
              </TouchableOpacity>
          </View>
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
  btnupdate: { 
     //   position: 'absolute', 
        width: 36, 
        height: 36, 
        alignItems: 'center', 
        justifyContent: 'center',  
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8,
        marginHorizontal:5
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
});
export default Pegawai;

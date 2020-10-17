import React, {Component,useState,useEffect} from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, Text, View, RefreshControl,Card, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, Overlay, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';




const ListAbsensi = ({navigation,route},props) => {
  const idpegawai=route.params.id
  const [email,setEmail] = useState("")
  const [count,setCount]=useState('')
  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [dialogVisible,setdialogVisible]=useState(false)
console.log(idpegawai)
  useEffect(()=>{
    fetchData();
    //fetchDataDetail();
  },[])
 
  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataAbsensi/'+idpegawai)
    .then(res=>res.json())
    .then(data=>{
        //console.log(data.count[0].count)
         setList(data.absen);
         setCount(data.count[0].count)
         setLoading(false)
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
    name={item.keterangan} 
    date={item.date}
    deskripsi={item.deskripsi}
    />
  );

  const Item = ({ name,date,deskripsi }) => (
  
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
      
      <Avatar />
      <View style={{width:'70%'}}>
      
      <Text style={{fontSize:16, paddingLeft:10}}>{date}</Text>
      <Text style={{paddingLeft:10,color:'grey'}}>{name}</Text>
      <Text style={{paddingLeft:10,color:'grey'}}>{deskripsi}</Text>
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Absensi</Text>
        </View>
      <View>
      </View>
      <View 
          style={styles.container}>
                <View style={{marginVertical:5}}>
                  <Text style={styles.text}>Masuk</Text>
                  <Text style={styles.text}>{count}</Text>

                </View>
        </View>
      <SafeAreaView style={{ flex: 1 }}>
        
        <FlatList
              renderItem={renderItem}
              onRefresh={()=>fetchData()}
              refreshing={loading}
              data={list}
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
  container:{
    //flex:1,
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:25,
            //paddingLeft: 10,
            backgroundColor:'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,
            
  },
  
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign:'center',
    marginVertical:5
  },
});
export default ListAbsensi;

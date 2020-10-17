import React, {Component,useState,useEffect} from 'react';
import { Image, FlatList, StyleSheet, Text, View, Button, RefreshControl,Card, Alert, SafeAreaView } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, Input, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

const Project = ({navigation}) => {
  

  const [idproject,setIdproject] = useState('')
  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(()=>{
    fetchData();
    
  },[])
 
  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataProject')
    .then(res=>res.json())
    .then(data=>{
        setList(data)
        setLoading(false)
        setFilteredDataSource(data);
        setMasterDataSource(data);
    })
 }

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
    name={item.nama} 
    id= {item._id}
    tglMulai={item.tglMulai}
    tglSelesai ={item.tglSelesai}
    namaC = {item.client.nama}
    alamat={item.client.alamat}
    idclient={item.client._id}
    />
  );

  const Item = ({ id,name,tglMulai,tglSelesai,namaC,alamat,idclient}) => (
    
    <TouchableOpacity onPress={()=>{navigation.navigate('DetailProjectAdmin',{id:id,idClient:idclient})}}>
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Project</Text>
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
      
      </SafeAreaView>
        
          <View
            style={{ 
                height:100, 
                width:100,
                position: 'absolute',
                top: 450, left:350,
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('AddProject')} style={styles.fab}>
              <Text style={styles.fabIcon}>+</Text>
              </TouchableOpacity>
          </View>

      
      </View>
    );
  };

  
const styles=StyleSheet.create({
  modalView:{
    backgroundColor:"#bbdefb",
    marginVertical:250,
   // borderWidth:2,
    borderRadius:14,
    marginHorizontal:15
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
}
});
export default Project;

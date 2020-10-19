import React, {Component,useState,useEffect} from 'react';
import { FlatList,Image, StyleSheet, Text, View, SafeAreaView,Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem, Avatar, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConfirmDialog } from 'react-native-simple-dialogs';


const Client = ({navigation}) => {
//  const [email,setEmail] = useState("")
  const [idclient,setIdClient] = useState("")
  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [dialogVisible,setdialogVisible]=useState(false)

  useEffect(()=>{
    fetchData();
    
  },[])
 
  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataClient')
    .then(res=>res.json())
    .then(data=>{
        setList(data)
        setLoading(false)
        setFilteredDataSource(data);
        setMasterDataSource(data);
    })
 }

 
 const deleteData = async (props) =>{
  console.log(idclient)
 fetch('http://mppk-app.herokuapp.com/deleteClient/'+idclient)
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
  nama={item.nama} 
  alamat={item.alamat}
  telp={item.telp}
  id={item._id}
  />
);

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

const Item = ({ telp,nama,alamat,id }) => (
  <TouchableOpacity onPress={() => {navigation.navigate('DetailClient',{id:id})}} >
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
    <View style={{width:'70%'}}>
    <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Nama Client</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{nama}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>NO Telp</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{telp} </Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Alamat</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{alamat}</Text>
                      </View>
    
    </View>
    {/* <View style={{flexDirection:'row-reverse',justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={() => {setdialogVisible(true),setIdClient(id)}} style={styles.btnupdate}>
              <Icon name="trash" size={20} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('EditClient',{id:id})}} style={styles.btnupdate}>
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Client</Text>
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
                top: '90%', left:'85%',
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('AddClient')} style={styles.fab}>
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
   
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,
    marginHorizontal:20,width:'27%'
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
    marginVertical:0,marginLeft:5
  },
});
export default Client;

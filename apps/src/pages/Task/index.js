import React, {Component, useState,useEffect} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab/tabPM';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,ListItem, Avatar } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';


const Task = ({navigation,route}) => {
  
const [name, setNama] = useState('');
const [task, setTask] = useState('');
const [iduser, setIdUser] = useState('');
const [idModule, setIdModule] = useState('');
const [list,setList]=useState([])
const [module,setModule]=useState([])
const idproject = route.params.id;
const [loading, setLoading] = useState(true);
const [tglMulai,setTglMulai]=useState()
const [tglSelesai,setTglSelesai]=useState()
const [spesifikasi,setSpesifikasi]=useState()

const sheetRef = React.createRef();
const fall = new Animated.Value(1);

useEffect(()=>{
  fetchDataTeam();
  
},[])

const fetchDataTeam = async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getDataTeam/'+idproject)
  .then(res=>res.json())
  .then(data=>{
  //    console.log(data)
      setList(data)
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
 
  const renderItem = ({ item }) => (
    
  <Item 
  name={item.user.nama} 
  id= {item.user._id}
  status={item.user.status}
  img = {item.user.image}
  />
  );

  const Item = ({ id,name,img,status }) => (
    
    <TouchableOpacity onPress={()=>{ navigation.navigate('AddTask',{nama:name,iduser:id,idproject:idproject})}}>
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
      <Avatar source={{uri:'http://mppk-app.herokuapp.com/'+img}}/>
      <View>
      
      <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
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
            onPress={()=>navigation.goBack()}
        >
          <Icon name="arrow-left" size={30} color='white'/>
        </TouchableOpacity>
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
            Task
          </Text>
        </View>

        <View style={{ flex: 1 }}>
                
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    onRefresh={()=>fetchDataTeam()}
                    refreshing={loading}
                    ItemSeparatorComponent={renderSeparatorView}
              />
            
            </SafeAreaView> 
            
{/*             
                <View
                  style={{ 
                      height:100, 
                      width:100,
                      position: 'absolute',
                      top: '70%', left:'80%',
                      }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('AddTask')} style={styles.fab}>
                    <Text style={styles.fabIcon}>+</Text>
                    </TouchableOpacity>
                </View> */}
            
            
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
});

export default Task;

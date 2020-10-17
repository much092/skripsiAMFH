import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView,Alert,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ListItem, Avatar } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { ConfirmDialog } from 'react-native-simple-dialogs';


const Material = ({navigation,route}) => {
  
 const sheetRef = React.createRef();
 const fall = new Animated.Value(0);
  const idproject = route.params.id;
  const [dialogVisible,setdialogVisible]=useState(false)
  const [idMaterial,setIdMaterial]= useState('')

  const [list,setList]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchData();
    
  },[])
 
  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataMaterial')
    .then(res=>res.json())
    .then(data=>{
        setList(data)
        setLoading(false)
    })
 }

 const deleteData = async (props) =>{
 
  fetch('http://mppk-app.herokuapp.com/deleteMaterial/'+idMaterial)
  .then(res=>res.json())
  .then(data=>{
      if(!data.error){
          Alert.alert(data.message+'!!!'+'\n'+"Swipe down untuk refresh")
          setdialogVisible(false)
          
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
    name={item.nama} 
    jml={item.jml} 
    deskripsi={item.deskripsi} 
    id= {item._id}
    />
  );



  const Item = ({ id,name,jml,deskripsi }) => (
    
    <TouchableOpacity >
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
      
      <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{jml}</Text>
      <Text style={{fontSize:16, paddingLeft:10}}>{deskripsi}</Text>
      </View>
      <View style={{flexDirection:'row-reverse',justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={() => {setdialogVisible(true),setIdMaterial(id)}} style={styles.btnupdate}>
              <Icon name="trash" size={20} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('EditMaterial',{idmaterial:id,id:idproject})}} style={styles.btnupdate}>
              <Icon name="edit" size={20} color='white'></Icon>
          </TouchableOpacity>
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
          
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Material </Text>
        </View>
    

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onRefresh={()=>fetchData()}
              refreshing={loading}
              ItemSeparatorComponent={renderSeparatorView}
        />
      
      </SafeAreaView> 
      <View
            style={{ 
                height:100, 
                width:100,
                position: 'absolute',
                top: '80%', left:'20%',
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('AddMaterial',{id:idproject})} style={styles.fab}>
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
});
export default Material;

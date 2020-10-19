import React, {Component,useState,useEffect} from 'react';
import { FlatList, ImageBackground, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import foto from '../../../src/icons/photo-album.png';
import team from '../../../src/icons/group.png';
import progress from '../../../src/icons/progress-bar.png';
import feedback from '../../../src/icons/chat.png';

const DetailProject = ({navigation,route}) => {
  useEffect(()=>{
    fetchData();
    fetchDataTeam();
    fetchDataClient();
    fetchDataCount();
    fetchDataMandor();
  },[])
  
  const idproject = route.params.id;
  const idclient = route.params.idClient;
  const idpegawai = route.params.idp;
  const user = []
  const project = []
  const [list,setList]=useState([])
  const [list2,setList2]=useState([])
  const [listClient,setListClient]=useState([])
  const [listCountSelesai,setListcountSelesai]=useState('')
  const [listCountTotal,setListcountTotal]=useState('')
  const [listTeam,setListTeam]=useState([])
  const [loading, setLoading] = useState(true);
  //console.log(idpegawai)
  
 
  const fetchDataMandor = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDetailProject/'+idproject)
    .then(res=>res.json())
    .then(data=>{
          setList2(data)
          setLoading(false)
    })
 }
 const fetchData = async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getDataProjectById/'+idproject)
  .then(res=>res.json())
  .then(data=>{
    //console.log(data)
        setList(data)
        setLoading(false)
  })
}
 const fetchDataClient = async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getDataClientById/'+idclient)
  .then(res=>res.json())
  .then(data=>{
        setListClient(data)
        setLoading(false)
     //   console.log(data)
  })
}
 const fetchDataTeam = async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getDataTeam/'+idproject)
  .then(res=>res.json())
  .then(data=>{
        setListTeam(data)
        setLoading(false)
    //    console.log(listTeam)
  })
}
 
const fetchDataCount= async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getCountProgress/'+idproject)
  .then(res=>res.json())
  .then(data=>{
        setListcountSelesai(data.selesai)
        setListcountTotal(data.total)
        console.log(data.total)
  })
}
 const renderContent = () => (
  <View
    style={{
      backgroundColor: '#bbdefb',
      padding: 16,
      height: 100,
      justifyContent:'center',
      marginHorizontal:10,borderRadius:20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }}
  >
    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('ProgressP',{id:idproject,idp:idpegawai}),sheetRef.current.snapTo(1)}}
          style={{backgroundColor:'white',
                  width:70,
                  height:70,
                  borderRadius:50,
                  marginHorizontal:20,
                  justifyContent:'center',alignItems:'center'
                }}
        >
        <Image source={progress} style={{height:25,width:25}}></Image>
        <Text >Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('FotoTask',{id:idproject,idp:idpegawai})}}
          style={{backgroundColor:'white',
                  width:70,
                  height:70,
                  borderRadius:50,
                  marginHorizontal:20,
                  justifyContent:'center',alignItems:'center'
                }}
        >
        <Image source={foto} style={{height:25,width:25}}></Image>
        <Text >Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('FeedbackPegawai',{id:idproject})}}
          style={{backgroundColor:'white',
                  width:70,
                  height:70,
                  borderRadius:50,
                  marginHorizontal:20,
                  justifyContent:'center',alignItems:'center'
                }}
        >
        <Image source={feedback} style={{height:25,width:25}}></Image>
        <Text >Feedback</Text>
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
const sheetRef = React.createRef();
const fall = new Animated.Value(0);

  
  return(
      <View style={{ flex: 1 }} >
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Project</Text>
        </View>
      <ScrollView style={{flex:1, backgroundColor: 'white'}}>
        
      <View 
          style={styles.container}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>Detail Project</Text>
                <View style={{marginVertical:5}}>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Nama Project</Text>
                <Text style={styles.titikdua}>:</Text>
                <Text style={styles.subtext}>{list.nama}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Jadwal</Text>
                <Text style={styles.titikdua}>:</Text>
                <Text style={styles.subtext}>{list.tglMulai} sampai {list.tglSelesai} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Deskripsi</Text>
                <Text style={styles.titikdua}>:</Text>
                <Text style={styles.subtext}>{list.deskripsi}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Mandor</Text>
                <Text style={styles.titikdua}>:</Text>
                {
                  list2.map((l)=>(
                  <Text style={styles.subtext}>{l.user.nama}</Text>
                  ))
                }
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Progress</Text>
                <Text style={styles.titikdua}>:</Text>
               {
                 listCountTotal.length >0 && listCountSelesai.length > 0 ? (
                 <Text style={styles.subtext}>{Math.round(listCountSelesai[0].countselesai/listCountTotal[0].counttotal*100)}%</Text>
                 ):(
                    <Text style={styles.subtext}>0%</Text>
                 )
               }
              </View>
                </View>
        </View>
       
        <View 
          style={styles.container}>
                <View style={{marginVertical:5}}>
                <Text style={styles.text2}>Detail Client</Text>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Nama Client</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{listClient.nama}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>NO Telp</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{listClient.telp} </Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Alamat</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{listClient.alamat}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Perusahaan</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{listClient.perusahaan}</Text>
                      </View>
                    
                </View>
        </View>
        
        
      </ScrollView>
      <View style={{height:110}}>
          <BottomSheet
                ref={sheetRef}
                snapPoints={[110,110]}
                initialSnap={0}
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:50,
  },
  
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,
    marginHorizontal:20,width:'28%'
  },
  titikdua: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5
  },
  subtext: {
    color: "grey",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,marginLeft:5
  },
  text2: {
    color: "black",
    fontWeight:'bold',
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'center',
    marginVertical:5,
    marginHorizontal:20,
  },
  container:{
    flex:1,
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
            
  }
})


export default DetailProject;

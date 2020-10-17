import React,{useState,useEffect} from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';



const EditClient = ({navigation,route},props) => {
    const [nama,setNama]=useState('')
    const [telp,setTelp]=useState('')
    const [alamat, setAlamat] = useState();
    const [perusahaan,setPerusahaan] = useState('');
    const idClient = route.params.id

    
useEffect(()=>{
    fetchData();
    
  },[])

  const fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataClientById/'+idClient)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setNama(data.nama)
        setTelp(data.telp)
        setAlamat(data.alamat)
        setPerusahaan(data.perusahaan)
    })
 }
    const sendData = async (props)=>{
        console.log(nama+' '+perusahaan+' '+telp+' '+alamat);
  
        fetch("http://mppk-app.herokuapp.com/updateClient/"+idClient,{
        
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "_id":idClient,
           "perusahaan":perusahaan,
           "alamat":alamat,
           "nama":nama,
           "telp":telp
         })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(!data.error){
                Alert.alert(data.nama+' Tersimpan')
                navigation.replace("Dashboard");
                console.log("sukses")
            }
            else{
                Alert.alert(data.error)
            }
          
        })
     }

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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}></Text>
      </View>

      <View style={{flex:1}}>
          <Text style={{
              marginVertical:30, 
              marginHorizontal:50, 
              justifyContent:'center', 
              textAlign:'center',
              fontSize:20, fontWeight:'bold'}}
              >
                  Edit Data Client
            </Text>
          <View>
                <Input
                    placeholder='Nama'
                    value={nama}
                    onChangeText={(text)=>setNama(text)}
                    leftIcon={
                        <Icon
                        name='user'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Input
                    placeholder='No. Telp'
                    value={telp}
                    onChangeText={(text)=>setTelp(text)}
                    leftIcon={
                        <Icon
                        name='phone'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Input
                    placeholder='Alamat'
                    value={alamat}
                    onChangeText={(text)=>setAlamat(text)}
                    leftIcon={
                        <Icon
                        name='map-marker'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Input
                    placeholder='Nama Perusahaan'
                    value={perusahaan}
                    onChangeText={(text)=>setPerusahaan(text)}
                    leftIcon={
                        <Icon
                        name='building'
                        size={24}
                        color='black'
                        />
                    }
                />

              <TouchableOpacity style={styles.btn} onPress={()=> sendData(props)}>
                  <Text style={{fontWeight:'bold',color:'white'}}>Ubah</Text>
              </TouchableOpacity>
          </View>
      </View>

      </View>
    );
  };

  
  
const styles=StyleSheet.create({
    input: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,

        },
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#0d47a1',
        alignItems:'center',
    }
});
export default EditClient;


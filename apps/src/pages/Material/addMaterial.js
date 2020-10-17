import React,{useState} from 'react';
import { Alert, Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
 
const AddMaterial = ({navigation,route},props) => {
    
    const [nama,setNama]= useState('')
    const [jumlah,setJumlah]=useState('')
    const [deskripsi,setDeskripsi]=useState('')
    const idproject = route.params.id;
   // console.log(idproject)
 
 const sendData = async (props)=>{
  
    fetch("http://mppk-app.herokuapp.com/send-data-material",{
    
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        "nama":nama,
        "jml":jumlah,
        "idproject":idproject,
        "deskripsi":deskripsi,
        "status":""
    })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(!data.error){
            Alert.alert(data.nama+' Tersimpan')
            navigation.replace('Material',{id:idproject})
        }
        else{
            Alert.alert(data.error)
        }
      
    })
   }

 const [date, setDate] = useState( Date.now());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setTglLahir(Moment(currentDate).format('DD-MM-YYYY'))
    };
    
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker1 = () => {
        showMode('date');
    };
    
    
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
                  Input Data Material
            </Text>
            <View style={{marginHorizontal:20}}>
            <Input
                    placeholder='Material'
                    value={nama}
                    onChangeText={(text)=>setNama(text)}
                    placeholderTextColor='black'
                    color='black'
                />
              <Input
                    placeholder='Jumlah'
                    value={jumlah}
                    onChangeText={(text)=>setJumlah(text)}
                    placeholderTextColor='black'
                    color='black'
                />
                <Input
                      placeholder='Deskripsi'
                      value={deskripsi}
                      onChangeText={(text)=>setDeskripsi(text)}
                      placeholderTextColor='black'
                      color='black'
                  />
              <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#0d47a1',borderRadius:25}}
                onPress={()=>{sendData()}}
                    >
                    <Text
                        style={{
                            fontSize:12,
                            fontWeight:'bold',
                            color: 'white',
                            textTransform: 'uppercase',
                            textAlign: 'center'
                        }}
                        >
                     Simpan
                    </Text>
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
    },
    picker:{
        //borderWidth:2,
        marginHorizontal:10,
    }
});
export default AddMaterial;


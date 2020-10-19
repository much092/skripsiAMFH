import React,{useState,useEffect} from 'react';
import { Image, StyleSheet, Text, View,Alert  } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab/tabPM';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';


const Stack = createStackNavigator();


const AddTask = ({navigation,route}) => {

const name = route.params.nama;
const iduser = route.params.iduser;
const idproject = route.params.idproject;
const [idModule, setIdModule] = useState('');
const [task, setTask] = useState('');
const [loading, setLoading] = useState(true);
const [tglMulai,setTglMulai]=useState()
const [tglSelesai,setTglSelesai]=useState()
const [spesifikasi,setSpesifikasi]=useState()
const [module,setModule]=useState([])

console.log(iduser)

 const [date, setDate] = useState(new Date(1598051730000));
 const [mode, setMode] = useState('date');
 const [show, setShow] = useState(false);
 
 const [date2, setDate2] = useState(new Date(1598051730000));
 const [mode2, setMode2] = useState('date');
 const [show2, setShow2] = useState(false);
 
 const onChange = (event, selectedDate) => {
     const currentDate = selectedDate || date;
     setShow(false);
     setDate(currentDate);
     setTglMulai(Moment(currentDate).format('DD-MM-YYYY'))
 };
 
 const onChange2 = (event, selectedDate) => {
     const currentDate = selectedDate || date;
     setShow2(false);
     setDate2(currentDate);
     setTglSelesai(Moment(currentDate).format('DD-MM-YYYY'))
 };
 
 const showMode = (currentMode) => {
     setShow(true);
     setMode(currentMode);
 };
 const showMode2 = (currentMode) => {
     setShow2(true);
     setMode2(currentMode);
 };
 
 const showDatepicker1 = () => {
     showMode('date');
 };
 
 const showDatepicker2 = () => {
     showMode2('date');
 };
 
 
useEffect(()=>{
    fetchDataModule();
    
  },[])

const fetchDataModule = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataModule/"+idproject)
    .then(res=>res.json())
    .then(data=>{
        setModule(data)
        setLoading(false)
       // console.log(data)
    })
  }

  
const sendData = async (props)=>{
    console.log(idModule+' '+iduser+' '+task)
    fetch("http://mppk-app.herokuapp.com/send-data-task",{
    
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "nama_task":task,
       "status":"none",
       "approved":"none",
       "tglMulai":tglMulai,
       "tglSelesai":tglSelesai,
       "spesifikasi":spesifikasi,
       "idmodule":idModule,
       "iduser":iduser
     })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(!data.error){
           //  setListPegawai()
            Alert.alert('Data Tersimpan')
            //console.log(data)
            setTask('')
            setIdModule('');
            navigation.goBack()
        }
        else{
            Alert.alert(data.error)
        }
      
    })
   }
  
   
  return(
      <View style={{ flex: 1,
        backgroundColor:'white', }}>
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
                Input Task
            </Text>
        </View>
      <View style={{flex:1}}>
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 16,
                    height: 600,
                }}
                >
                <Input
                    color="black"
                    placeholderTextColor='black'
                    value= {name}
                    disabled='true'
                />
                <View style={{flexDirection:'row'}}>
                        <SelectPicker
                                    style={{flex:1,borderBottomWidth:1, borderBottomColor:'#bdbdbd',marginHorizontal:"3%", marginVertical:0}}
                                    placeholder="Kategori Pekerjaan"
                                    onSelectedStyle={{fontSize: 20, color:'black',paddingLeft:10}}
                                    placeholderStyle={{fontSize: 20, color:'black',}}
                                    onValueChange={(value) => {
                                        setIdModule(value);
                                    }}
                                    selected={idModule}
                                    >
                                    {Object.values(module).map((val, index) => (
                                        <SelectPicker.Item label={val.kategori_pekerjaan} value={val._id} key={val._id} />
                                    ))}

                        </SelectPicker>
                    </View>
                <Input style={{marginVertical:10}}
                    color="black"
                    placeholderTextColor='black'
                    placeholder= "Sub Task"
                    value={task}
                    onChangeText={(text)=>setTask(text)}
                />{show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date2}
                    mode={mode2}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
                
                {show2 && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange2}
                    />
                )}
                <TouchableOpacity onPress={showDatepicker1} >
                <Input
                    color="black"
                    placeholderTextColor='black'
                    placeholder='Tgl Mulai'
                    value={tglMulai}
                    onChangeText={(text)=>setTglMulai(text)}
                    rightIcon={
                        <Icon
                        name='calendar'
                        size={24}
                        color='black'
                        
                        />
                    }
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={showDatepicker2} >
                <Input
                    color="black"
                    placeholderTextColor='black'
                    placeholder='Tgl Selesai'
                    value={tglSelesai}
                    onChangeText={(text)=>setTglSelesai(text)}
                    rightIcon={
                        <Icon
                        name='calendar'
                        size={24}
                        color='black'
                        />
                    }
                />
                </TouchableOpacity>
                <Input style={{marginVertical:10}}
                    color="black"
                    placeholderTextColor='black'
                    placeholder= "Spesifikasi"
                    value={spesifikasi}
                    onChangeText={(text)=>setSpesifikasi(text)}
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
    }
});
export default AddTask;


import React,{useState} from 'react';
import { Alert, Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
 
const AddPegawai = ({navigation},props) => {
    const options = ["Karyawan","PM"];
    const [status, setSelected] = useState();
    const [email,setEmail] = useState('');
    const [tglLahir,setTglLahir]=useState('')
    const [nama,setNama]=useState('')
    const [ktp,setKtp]=useState('')
    const [telp,setTelp]=useState('')
   
 const sendCred = async (props)=>{
    
    fetch("http://mppk-app.herokuapp.com/send-data-pegawai",{
    
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "status":status,
       "nama":nama,
       "ktp":ktp,
       "telp":telp,
       "aktif":'no',
       "tgl_lahir":tglLahir
     })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(!data.error){
            Alert.alert(data.nama+' Tersimpan')
            navigation.replace("Dashboard")
            //console.log("sukses")
        }
        else{
            console.log('aa')
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
                  Input Data Pegawai
            </Text>
          <ScrollView>
                <Input
                    placeholder='No. KTP'
                    value={ktp}
                    onChangeText={(text)=>setKtp(text)}
                    leftIcon={
                        <Icon
                        name='id-card'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Input
                    placeholder='Email'
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                    leftIcon={
                        <Icon
                        name='envelope'
                        size={24}
                        color='black'
                        />
                    }
                />
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
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
                
                <TouchableOpacity onPress={showDatepicker1} >
                <Input
                    placeholder='Tgl Lahir'
                    value={tglLahir}
                    onChangeText={(text)=>setTglLahir(text)}
                    leftIcon={
                        <Icon
                        name='calendar'
                        size={24}
                        color='black'
                        
                        />
                    }
                />
                </TouchableOpacity>
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
                <View style={{flexDirection:'row'}}>
                    
                    <SelectPicker
                        style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                        placeholder="Status"
                        onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        onValueChange={(value) => {
                            setSelected(value);
                        }}
                        selected={status}
                        >
                         <SelectPicker.Item label="Karyawan" value="karyawan"  />
                         <SelectPicker.Item label="Project Manager" value="pm"  />
                       

                    </SelectPicker>
                </View>
               

              <TouchableOpacity style={styles.btn} onPress={()=> sendCred(props)}>
                  <Text style={{fontWeight:'bold',color:"white"}}>Tambah</Text>
              </TouchableOpacity>
          </ScrollView>
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
export default AddPegawai;


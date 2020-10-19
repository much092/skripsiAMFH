import React from 'react';
import { Component,useState,useEffect } from 'react';
import { Image, StyleSheet, Text, View, Alert,Button } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const AddProject = ({navigation},props) => {
    
    const [client, setClient] = useState()
    const [list,setList]=useState([])
    const [nama,setNama]=useState()
    const [tglMulai,setTglMulai]=useState()
    const [tglSelesai,setTglSelesai]=useState()
    const [deskripsi,setDeskripsi]=useState()
    const [budget,setBudget]=useState()
    const [lokasi,setLokasi]=useState()
    //console.log()

     
     const sendData = async (props)=>{
        console.log(client)
        if (tglSelesai<tglMulai){
            Alert.alert('Tgl Selesai lebih kecil dari Tgl Mulai')
        }
        else{
            fetch("http://mppk-app.herokuapp.com/send-data-project",{
    
                method:"POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                "nama":nama,
                "tglMulai":tglMulai,
                "tglSelesai":tglSelesai,
                "deskripsi":deskripsi,
                "idclient":client,
                "status":"undone",
                "budget":budget,
                "lokasi":lokasi,
                "aktif":"no"
                })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(!data.error){
                        Alert.alert(data.nama+' Tersimpan')
                        navigation.replace("Dashboard")
                        console.log("sukses")
                    }
                    else{
                        Alert.alert(data.error)
                    }
                
                })
        }
       
     }
     
    useEffect(()=>{
        fetchData();
        
      },[])
     
    const fetchData = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataClient')
        .then(res=>res.json())
        .then(data=>{
            setList(data)
           
        })
     }

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
    
    
  return(
      <View style={{ flex: 1 }}>

      <View style={{flex:1}}>
          <Text style={{
              marginVertical:30, 
              marginHorizontal:50, 
              justifyContent:'center', 
              textAlign:'center',
              fontSize:20, fontWeight:'bold'}}
              >
                  Input Data Project
            </Text>
          <ScrollView>
                <Input
                    placeholder='Nama Project'
                    value={nama}
                    onChangeText={(text)=>setNama(text)}
                    leftIcon={
                        <Icon
                        name='file'
                        size={24}
                        color='black'
                        />
                    }
                />
                 {show && (
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
                    placeholder='Tgl Mulai'
                    value={tglMulai}
                    onChangeText={(text)=>setTglMulai(text)}
                    leftIcon={
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
                    placeholder='Tgl Selesai'
                    value={tglSelesai}
                    onChangeText={(text)=>setTglSelesai(text)}
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
                    placeholder='Budget'
                    value={budget}
                    onChangeText={(text)=>setBudget(text)}
                    keyboardType='numeric'
                    leftIcon={
                        <Icon
                        name='dollar'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Input
                    placeholder='lokasi'
                    value={lokasi}
                    onChangeText={(text)=>setLokasi(text)}
                    leftIcon={
                        <Icon
                        name='map-marker'
                        size={24}
                        color='black'
                        />
                    }
                />

              <TextInput style={styles.inputarea}
                 placeholder="Deskripsi"
                 multiline={true}
                 textAlignVertical="top"
                 value={deskripsi}
                 onChangeText={(text)=>setDeskripsi(text)}
              ></TextInput>

              <View style={{flexDirection:'row'}}>
                    
                    <SelectPicker
                        style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                        placeholder="Client"
                        onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        onValueChange={(value) => {
                            setClient(value);
                        }}
                        selected={client}
                        >
                        {Object.values(list).map((val, index) => (
                            <SelectPicker.Item label={val.nama} value={val._id} key={index} />
                        ))}

                    </SelectPicker>
                </View>

              <TouchableOpacity style={styles.btn} onPress={()=>sendData()}>
                  <Text style={{fontWeight:'bold',color:'white'}}>Tambah</Text>
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
    inputarea: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,
        justifyContent: 'flex-start',
        height: 90,
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
export default AddProject;


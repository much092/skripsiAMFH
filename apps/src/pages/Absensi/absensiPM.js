import React,{useState,useEffect} from 'react';
import { Alert, Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
 
const AbsensiPM = ({navigation,route},props) => {
    const [keterangan, setKeterangan] = useState();
    const [iduser,setIduser] = useState('');
    const [deskripsi,setDeskripsi] = useState('');
    
    const idproject = route.params.id;
    const [listPegawai,setListPegawai]=useState([])
    
     
    useEffect(()=>{
        fetchDataPegawai();
        
    },[])

    const fetchDataPegawai = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataTeam/'+idproject)
        .then(res=>res.json())
        .then(data=>{
           // console.log(data)
            setListPegawai(data)
            //setLoading(false)
        })
     }

    const sendCred = async (props)=>{
        console.log(iduser+' '+keterangan+' '+Moment(Date.now()).format('DD-MM-YYYY')+' '+deskripsi)
        fetch("http://mppk-app.herokuapp.com/send-data-absen",{
        
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "iduser":iduser,
           "date":Moment(Date.now()).format('DD-MM-YYYY'),
           "keterangan":keterangan,
           "deskripsi":deskripsi,
         })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(!data.error){
                Alert.alert('Absensi Berhasil ')
                setKeterangan('')
                setDeskripsi('')
                setIduser('')
                navigation.replace("AbsensiPM",{id:idproject})
                //console.log("sukses")
            }
            else{
                console.log('aa')
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Absensi</Text>
        </View>
      <View style={{flex:1}}>
          
          <ScrollView>
               
                    <SelectPicker
                        style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                        placeholder="Nama Pegawai"
                        onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        onValueChange={(value) => {
                            setIduser(value);
                        }}
                        selected={iduser}
                        >
                        {Object.values(listPegawai).map((val, index) => (
                            <SelectPicker.Item label={val.user.nama} value={val.user._id} key={val._id} />
                        ))}

                    </SelectPicker>
                <View style={{flexDirection:'row'}}>
                    
                    <SelectPicker
                        style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                        placeholder="Keterangan"
                        onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                        onValueChange={(value) => {
                            setKeterangan(value);
                        }}
                        selected={keterangan}
                        >
                         <SelectPicker.Item label="Masuk" value="masuk"  />
                         <SelectPicker.Item label="Tidak Masuk" value="tidak masuk"  />
                       

                    </SelectPicker>
                </View>
                <Input
                    placeholder='Deskripsi'
                    value={deskripsi}
                    onChangeText={(text)=>setDeskripsi(text)}
                    style={{marginHorizontal:"5%"}}
                />

              <TouchableOpacity style={styles.btn} onPress={()=> sendCred(props)}>
                  <Text style={{fontWeight:'bold',color:"white"}}>Absen</Text>
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
export default AbsensiPM;


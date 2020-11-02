import React,{useState,useEffect, Component} from 'react';
import { Alert, Image, StyleSheet, Text, View, BackHandler} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
 
class EditAlat extends Component{

    state = {
        nama: '',
        jumlah: '',
        deskripsi: '',
        idproject: this.props.route.params.id,
        idalat: this.props.route.params.idalat,
    }
    
    componentDidMount(){
        this.fetchData();
    }

    fetchData = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataAlatById/'+ this.state.idalat)
        .then(res=>res.json())
        .then(data=>{
            this.setState({nama:data.nama})
            this.setState({jumlah:data.jml})
            this.setState({deskripsi:data.deskripsi})
        })
    }

    sendData = async (props)=>{
        const { navigation } = this.props;
        fetch("http://mppk-app.herokuapp.com/updateAlat/",{
        
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "_id":this.state.idalat,
            "nama":this.state.nama,
            "jml":this.state.jumlah,
            "deskripsi":this.state.deskripsi,
        })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(!data.error){
                Alert.alert('Data berhasil di update')
                navigation.goBack()
                navigation.goBack()
                navigation.replace('Alat',{id:this.state.idproject})
            }
            else{
                Alert.alert(data.error)
            }
        
        })
    }

    render(){
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
                    Update Data Alat
                </Text>
                <View style={{marginHorizontal:20}}>
                <Input
                            placeholder='Alat'
                            value={this.state.nama}
                            onChangeText={(text)=>this.setState({nama:text})}
                            placeholderTextColor='black'
                            color='black'
                        />
                <Input
                            placeholder='Jumlah'
                            value={this.state.jumlah}
                            onChangeText={(text)=>this.setState({jumlah:text})}
                            placeholderTextColor='black'
                            color='black'
                        />
                <Input
                            placeholder='Deskripsi'
                            value={this.state.deskripsi}
                            onChangeText={(text)=>this.setState({deskripsi:text})}
                            placeholderTextColor='black'
                            color='black'
                />
                <TouchableOpacity style={{paddingVertical:20, backgroundColor:'#0d47a1',borderRadius:25}}
                    onPress={()=>{this.sendData()}}
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
        )
    }
}

// const EditAlat = ({navigation,route},props) => {
    

//    // console.log(idproject)
 
//    useEffect(()=>{
//     fetchData();
    
//   },[])

//  const [date, setDate] = useState( Date.now());
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);
    
//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShow(false);
//         setDate(currentDate);
//         setTglLahir(Moment(currentDate).format('DD-MM-YYYY'))
//     };
    
    
//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };
    
//     const showDatepicker1 = () => {
//         showMode('date');
//     };
    
    
//   return(

//     );
//   };

  
  
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
export default EditAlat;


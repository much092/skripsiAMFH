import React, {Component,useState,useEffect} from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, Text, View, RefreshControl,Card, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, Overlay, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class FeedbackPegawai extends Component{
//   const [idpegawai,setIdPegawai] = useState("")
//   const [email,setEmail] = useState("")
//   const [listdetail,setListDetail]=useState([])
//   const [list,setList]=useState([])
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);
//   const [dialogVisible,setdialogVisible]=useState(false)
  state = {
    idproject: this.props.route.params.id,
    idpegawai: this.props.route.params.idp,
    idTask: '',
    deksripsi: '',
    nama: '',
    img: [],
    img2: '',
    listTask: [],
    list: [],
    loading: true,
    modalVisible: false,
    filteredDataSource: [],
    masterDataSource: [],
  }
  
  componentDidMount(){
    this.fetchData();
    console.log(this.state.idproject+' '+this.state.idpegawai)
  }
    
  fetchData = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDataFeedbackPegawai/'+this.state.idproject+'/'+this.state.idpegawai)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        this.setState({filteredDataSource:data});
        this.setState({masterDataSource:data});
        this.setState({loading:false})
      })
  }

  renderSeparatorView = () => {
    return (
      <View style={{
          height: 1, 
          width: "100%",
          backgroundColor: "#CEDCCE",
        }}
      />
    );
  };

  render(){
    const { navigation } = this.props;
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Feedback</Text>
        </View>
      <View>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
              renderItem={({item})=>(
                      <TouchableOpacity  >
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
                          
                          <Avatar />
                          <View style={{width:'70%'}}>
                          
                          <Text style={{fontSize:16, paddingLeft:10}}>Task: {item.task.nama_task}</Text>
                          <Text style={{paddingLeft:10,color:'grey'}}>Feedback: {item.feedback}</Text>
                          </View>
                          
                        </View>
                      </TouchableOpacity>
              )}
              onRefresh={()=>fetchData()}
              refreshing={this.state.loading}
              data={this.state.filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparatorView}
        />
        
      </SafeAreaView>
      
      </View>
    )
  }
}


// const FeedbackPegawai = ({navigation},props) => {


//   useEffect(()=>{
//     fetchData();
//     //fetchDataDetail();
//   },[])
 
//   const fetchData = async (props)=>{
//     fetch('http://mppk-app.herokuapp.com/getDataFeedbackPegawai')
//     .then(res=>res.json())
//     .then(data=>{
//         setFilteredDataSource(data);
//         setMasterDataSource(data);
//         setLoading(false)
//         console.log(data)
//     })
//  }

// const renderSeparatorView = () => {
//   return (
//     <View style={{
//         height: 1, 
//         width: "100%",
//         backgroundColor: "#CEDCCE",
//       }}
//     />
//   );
// };

// const searchFilterFunction = text => {    
//   if (text) {
//     // Inserted text is not blank
//     // Filter the masterDataSource
//     // Update FilteredDataSource
//     const newData = masterDataSource.filter(
//       function (item) {
//         const itemData = item.nama
//           ? item.nama.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//     });
//     setFilteredDataSource(newData);
//     setSearch(text);
//   } else {
//     // Inserted text is blank
//     // Update FilteredDataSource with masterDataSource
//     setFilteredDataSource(masterDataSource);
//     setSearch(text);
//   }  
// };

//   const renderItem = ({ item }) => (
    
//     <Item 
//     name={item.task.nama_task} 
//     id={item._id}
//     title={item.feedback}
//     />
//   );

//   const Item = ({ title,name,id,img,email }) => (
  
//     <TouchableOpacity  >
//     <View 
//     style={{
//         flexDirection:'row' ,
//         borderBottomWidth:0,
//         backgroundColor:'white',
//         paddingVertical:10,
//         paddingHorizontal:20,
//         borderRadius:6,
//         alignItems:'center', 

//     }}>
      
//       <Avatar />
//       <View style={{width:'70%'}}>
      
//       <Text style={{fontSize:16, paddingLeft:10}}>Task: {name}</Text>
//       <Text style={{paddingLeft:10,color:'grey'}}>Feedback: {title}</Text>
//       </View>
      
//     </View>
//     </TouchableOpacity>
//   );
//   return(

//     );
//   };

  
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
    
  modalView: {
   // marginLeft:'40%',marginBottom:'120%',
    width:200,
    height:100,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    justifyContent:'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default FeedbackPegawai;

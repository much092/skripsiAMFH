import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView,Alert,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ListItem, Avatar } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class AlatPM extends Component{

  state = {
    idAlat: '',
    idproject: this.props.route.params.id,
    list: [],
    loading: true,
  }
 
  componentDidMount(){
    this.fetchData();
  }

  fetchData = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDataAlatByIdProject/'+ this.state.idproject)
      .then(res=>res.json())
      .then(data=>{
        this.setState({list:data})
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
          
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Alat </Text>
        </View>
    

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
              data={this.state.list}
              renderItem={({item})=>(
                  <TouchableOpacity onPress={() => {navigation.navigate('DetailAlat',{idalat:item._id,id:this.state.idproject})}} >
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
                                    <View style={{flexDirection:'row'}}>
                                      <Text style={styles.text}>Nama Alat</Text>
                                      <Text style={styles.titikdua}>:</Text>
                                      <Text style={styles.subtext}>{item.nama}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                      <Text style={styles.text}>Jumlah</Text>
                                      <Text style={styles.titikdua}>:</Text>
                                      <Text style={styles.subtext}>{item.jml} </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                      <Text style={styles.text}>Deskripsi</Text>
                                      <Text style={styles.titikdua}>:</Text>
                                      <Text style={styles.subtext}>{item.deskripsi}</Text>
                                    </View>
                    
                    </View>
                                    
                  </View>
                  </TouchableOpacity>
              )}
              keyExtractor={item => item._id}
              onRefresh={()=>this.fetchData()}
              refreshing={this.state.loading}
              ItemSeparatorComponent={this.renderSeparatorView}
        />
      
      </SafeAreaView> 
     </View>
    )
  }
}

// const AlatPM = ({navigation,route}) => {
  
//  const sheetRef = React.createRef();
//  const fall = new Animated.Value(0);
//   const idproject = route.params.id;
//   const [idAlat,setIdAlat]= useState('')
//   const [dialogVisible,setdialogVisible]=useState(false)
//   console.log(idproject)

//   const [list,setList]=useState([])
//   const [loading, setLoading] = useState(true);
  
//   useEffect(()=>{
//     fetchData();
    
//   },[])
 
//   const fetchData = async (props)=>{
//     fetch('http://mppk-app.herokuapp.com/getDataAlatByIdProject/'+idproject)
//     .then(res=>res.json())
//     .then(data=>{
//         setList(data)
//         setLoading(false)
//     })
//  }
 
 
//  const renderSeparatorView = () => {
//    return (
//      <View style={{
//          height: 1, 
//          width: "100%",
//          backgroundColor: "#CEDCCE",
//        }}
//      />
//    );
//  };

//   const renderItem = ({ item }) => (
    
//     <Item 
//     name={item.nama} 
//     jml={item.jml}
//     deskripsi={item.deskripsi}
//     id= {item._id}
//     />
//   );

//   const Item = ({ id,name,jml,deskripsi }) => (
    
//     <TouchableOpacity onPress={() => {navigation.navigate('DetailAlat',{idalat:id,id:idproject})}} >
//     <View 
//     style={{
//         flexDirection:'row' ,
//         borderBottomWidth:0,
//         backgroundColor:'white',
//         paddingVertical:10,
//         borderRadius:6,
//         alignItems:'center',

//     }}>
//       <Avatar></Avatar>
//       <View style={{width:'70%'}}>
//                       <View style={{flexDirection:'row'}}>
//                         <Text style={styles.text}>Nama Alat</Text>
//                         <Text style={styles.titikdua}>:</Text>
//                         <Text style={styles.subtext}>{name}</Text>
//                       </View>
//                       <View style={{flexDirection:'row'}}>
//                         <Text style={styles.text}>Jumlah</Text>
//                         <Text style={styles.titikdua}>:</Text>
//                         <Text style={styles.subtext}>{jml} </Text>
//                       </View>
//                       <View style={{flexDirection:'row'}}>
//                         <Text style={styles.text}>Deskripsi</Text>
//                         <Text style={styles.titikdua}>:</Text>
//                         <Text style={styles.subtext}>{deskripsi}</Text>
//                       </View>
      
//       </View>
//       {/* <View style={{flexDirection:'row-reverse',justifyContent:'flex-end'}}>
//           <TouchableOpacity onPress={() => {setdialogVisible(true),setIdAlat(id)}} style={styles.btnupdate}>
//               <Icon name="trash" size={20} color="white"></Icon>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => {navigation.navigate('EditAlat',{idalat:id,id:idproject})}} style={styles.btnupdate}>
//               <Icon name="edit" size={20} color='white'></Icon>
//           </TouchableOpacity>
//       </View> */}
      
//     </View>
//     </TouchableOpacity>
//   );

//   return(
//       <View style={{ flex: 1 }}>
//         <View 
//           style={{
//             flexDirection:'row',
//             alignItems:'center',
//             backgroundColor:'#039be5',
//             paddingVertical:10
//           }}
//         >
//         <TouchableOpacity
//             style={{
//             backgroundColor:'#039be5',
//             width:40, height:40,
//             marginLeft:20
//             }}
//             onPress={()=>navigation.goBack()}
//         >
//           <Icon name="arrow-left" size={30} color='white'/>
//         </TouchableOpacity>
          
//           <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Alat </Text>
//         </View>
    

//       <SafeAreaView style={{ flex: 1 }}>
//         <FlatList
//               data={list}
//               renderItem={renderItem}
//               keyExtractor={item => item._id}
//               onRefresh={()=>fetchData()}
//               refreshing={loading}
//               ItemSeparatorComponent={renderSeparatorView}
//         />
      
//       </SafeAreaView> 
//       <View
//             style={{ 
//                 height:100, 
//                 width:100,
//                 position: 'absolute',
//                 top: '90%', left:'85%',
//                 }}
//           >
//               <TouchableOpacity onPress={() => navigation.navigate('AddAlat',{id:idproject})} style={styles.fab}>
//               <Text style={styles.fabIcon}>+</Text>
//               </TouchableOpacity>
//       </View>
//       <ConfirmDialog
//               title="Alert !!!!"
//               message="Apakah anda yakin ?"
//               visible={dialogVisible}
//               onTouchOutside={()=>setdialogVisible(false)}
//               positiveButton={{
//                   title: "YES",
//                   onPress: () => deleteData()
//               }}
//               negativeButton={{
//                   title: "NO",
//                   onPress: () => setdialogVisible(false)
//               }}
//           />
//      </View>
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
  
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,
    marginHorizontal:20,width:'25%'
  },
  titikdua: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0
  },
  subtext: {
    color: "grey",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,marginLeft:5
  }, 
});
export default AlatPM;

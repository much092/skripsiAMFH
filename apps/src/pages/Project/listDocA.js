import React, {Component,useState,useEffect} from 'react';
import { TextInput, SafeAreaView, FlatList, View,Text,
         TouchableOpacity,StyleSheet, PermissionsAndroid, Alert, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';
//import PushNotification from 'react-native-push-notification'

import pdf from '../../../src/icons/pdf.png';
import doc from '../../../src/icons/doc.png';
import xls from '../../../src/icons/xls.png';
import jpeg from '../../../src/icons/jpg.png';
import png from '../../../src/icons/png.png';

const ListDocAdmin = ({navigation,route}) => {
  const idproject = route.params.id;
  const [loading, setLoading] = useState(true);
  const [list,setList]=useState([])
  const [file,setFile]= useState('')
  const [name,setName] = useState('')
  const [type,SetType]=useState('')
  console.log(idproject)

  useEffect(()=>{
    fetchData();
    
  },[])
 
const fetchData= async (props)=>{
  fetch("http://mppk-app.herokuapp.com/getDataDocument/"+idproject)
  .then(res=>res.json())
  .then(data=>{
      setList(data)
      setLoading(false)
  })
}
const sendData = async ()=>{
  console.log(file)  
  console.log(name+' '+type)
  //console.log(response.data)
      const config = {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify({
          "fileData":'data:'+type+';base64,'+ [file],
          "fileName":name,
          "type":type,
          "idproject":idproject
        }),
      };
      fetch("http://mppk-app.herokuapp.com/" + "upload", config)
      .then((checkStatusAndGetJSONResponse)=>{       
      console.log(checkStatusAndGetJSONResponse);
      }).catch((err)=>{console.log(err)});

      setName('')
 }

  const openGallery = async () => {
      const options = {
         
      }
      FilePickerManager.showFilePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else if (response.uri){
         console.log(response)
         RNFetchBlob.fs.readFile(response.uri,'base64')
          // files will an array contains filenames
          .then((files) => {
            //setState({base64Str:files})
           //console.log(files)
            setName(response.fileName)
            setFile(files)
            SetType(response.type)
          })
        }
      });

    }
const down = async (doc,type) =>{
  let name = doc
  let dirs = RNFS.DownloadDirectoryPath;
 // console.log("--path--",dirs)
  const file_path = dirs +'/'+name

  console.log(file_path+' '+type)
  let imagePath = null;
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      RNFetchBlob
      .config({
          addAndroidDownloads : {
              useDownloadManager : true, // <-- this is the only thing required
              // Optional, override notification setting (default to true)
              notification : true,
              // Optional, but recommended since android DownloadManager will fail when
              // the url does not contains a file extension, by default the mime type will be text/plain
              mime : type,
              path:file_path,
              description : 'File downloaded by download manager.'
          } 
      })
      .fetch('GET', 'http://mppk-app.herokuapp.com/'+doc)
      .then((resp) => {
        // the path of downloaded file
        resp.path()
      })
      // RNFetchBlob.config({
      
      //     fileCache: true,
      //     addAndroidDownloads : {
      //      useDownloadManager:true,
      //       // Optional, override notification setting (default to true)
      //       notification : true,
      //      // title : name,
      //       // Optional, but recommended since android DownloadManager will fail when
      //       // the url does not contains a file extension, by default the mime type will be text/plain
      //       mime : type,
      //      // path:RNFS.DownloadDirectoryPath+'/'+name,
      //       description : 'File downloaded by download manager.'
      //   }
      //   })
      // .fetch("GET", "http://mppk-app.herokuapp.com/"+doc)
      // // .progress({ interval : 1 },(received,total)=>{
      // //     console.log(received+' '+total+' '+received/total*100)
          
      // //   //  const progress = received/total*100;
          
      // //     if((received/total*100) === 100){
      // //       console.log('download completed')
      // //     }
      // // })
      // // // the image is now dowloaded to device's storage
      // .then(resp => {
      //   // the image path you can use it directly with Image component
      //   //imagePath = 
      //       resp.path();
      // //  return resp.readFile("base64");
      // // console.log(resp)
      // })
      
      // .then(base64Data => {
      //   // here's base64 encoded image
      //  // console.log(base64Data);
      //   RNFetchBlob.fs.createFile(file_path,base64Data,'base64')
      //   .then((rep) => { 
      //       // RNFetchBlob.android.addCompleteDownload({
      //       //   title: name,
      //       //   description: 'desc',
      //       //   mime: type,
      //       //   path: file_path,
      //       //   showNotification: true,
      //       //   notification: true
      //       // })
      //    // RNFetchBlob.android.actionViewIntent(file_path,type)
      //   // return fs.unlink(imagePath);
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     Alert.alert('File already exist')
      //   });
      // })
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }

  // RNFetchBlob.config({
  //   fileCache: true,
  //   addAndroidDownloads : {
  //     // Show notification when response data transmitted
  //     notification : true,
  //     // Title of download notification
  //     title : name,
  //     // File description (not notification description)
  //     description : 'An image file.',
  //     mime : type,
  //     // Make the file scannable  by media scanner
  //     mediaScannable : true,
  //   }
  // })
  //   .fetch("GET", "http://mppk-app.herokuapp.com/"+doc)
  //   // the image is now dowloaded to device's storage
  //   .then(resp => {
  //     // the image path you can use it directly with Image component
  //     imagePath = resp.path();
  //     return resp.readFile("base64");
  //    // console.log(resp)
  //   })
  //   .then(base64Data => {
  //     // here's base64 encoded image
  //     console.log(base64Data);
    
  //     RNFetchBlob.fs.createFile(file_path,base64Data,'base64')
  //     .then((rep) => { 
  //       console.log(rep);
  //      // return fs.unlink(imagePath);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
      // remove the file from storage
    //});
}


const renderSeparatorView = () => {
  return (
    <View style={{
        height: 1, 
        width: "100%",
        backgroundColor: "#CEDCCE",
      }}
    />
  );
};

  const renderItem = ({ item }) => (
    
    <Item 
    name={item.fileName} 
    id={item._id}
    type={item.type}
    />
  );
  
  const Item = ({ deskripsi,name,type }) => (
  
    
    <TouchableOpacity  style={{backgroundColor:'grey', }} >
    <View 
    style={{
        flexDirection:'row' ,
        borderBottomWidth:0,
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'space-between'
  
    }}>
      
      <View style={{width:'80%', flexDirection:'row'}}>
      {
        type === 'application/pdf'?(
          <Image source={pdf} style={{color:'white',height:30,width:30}}/>
        ):
        type === 'image/jpeg'?(
          <Image source={jpeg} style={{color:'white',height:30,width:30}}/>
        ):
        type === 'image/png'?(
          <Image source={png} style={{color:'white',height:30,width:30}}/>
        ):
        type === 'application/doc'?(
          <Image source={doc} style={{color:'white',height:30,width:30}}/>
        ):
        (
          <Image source={xls} style={{color:'white',height:30,width:30}}/>
        )

      }
      <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      
      </View>
      <View>
      <TouchableOpacity onPress={()=>down(name,type)} style={styles.btndownload}>
        <Icon name="download" size={25} color="white"></Icon>
      </TouchableOpacity>
      </View>
      
    </View>
    
    </TouchableOpacity>
  );
  
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Dokumen</Text>
        </View>
      <View style={{flex:1}}>
        <View>
              <View style={{
                  marginHorizontal:0,
                  opacity:1,marginHorizontal:20,
                  flexDirection:'row',justifyContent:'space-between'
              }}>
              <TextInput style={styles.input}
                  placeholder=""
              >{name}</TextInput>
              
              <TouchableOpacity style={styles.btnchoose} onPress={()=>openGallery()} > 
                <Icon name="paperclip" size={30} color="white"></Icon>
              </TouchableOpacity>

              </View>
              
              <TouchableOpacity style={styles.btn} onPress={()=>sendData()} >
                  <Text style={{fontWeight:'bold',color:'white'}}>Upload</Text>
              </TouchableOpacity>
              
          </View>
          <SafeAreaView style={{marginVertical:10}}>
              <FlatList
                renderItem={renderItem}
                onRefresh={()=>fetchData()}
                refreshing={loading}
                data={list}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparatorView}
              />
          </SafeAreaView>  
      </View>
      
      </View>
    );
  };
  
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
    btndownload:{
      backgroundColor: '#039be5',  
      width: 36, 
      height: 36, 
      borderRadius:18,
      alignItems:'center',
      justifyContent:'center'
    },
    input: { 
      marginVertical:10,
      borderWidth:2,
      borderRadius:10,
      paddingHorizontal:10,
      width:300

      },
  btn:{
      marginVertical:10,
      borderRadius:20,
      paddingVertical:10,
      marginHorizontal:100,
      backgroundColor:'#0d47a1',
      alignItems:'center',
  },
  
  btnchoose:{
      marginVertical:10,
      borderRadius:25,
      paddingVertical:10,
      backgroundColor:'#1565c0',
      alignItems:'center',
      width:50,height:50
      
  }
    
});
export default ListDocAdmin;

/**
 * Created by admin on 2017/6/9.
 */
import React, { Component } from 'react';
import {
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
	 AsyncStorage,
  FlatList,
  StyleSheet,
   Alert,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Mock from 'mockjs';
import request from '../config/request';
import config from '../config/config';
var ImagePicker = require('react-native-image-picker');
const {width, height} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
});

var options = {//上传图片控件参数
  title: '选择照片',
  takePhotoButtonTitle: '拍照',
  cancelButtonTitle: '取消',
  chooseFromLibraryButtonTitle: '从相册选择',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ReportInput extends Component {//问题描述组件
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      text: '',
    }
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event) {//根据上传的图片动态调整宽高
    let height = event.nativeEvent.contentSize.height;
    let text = event.nativeEvent.text;
    this.setState({
      height: height,
      text: text,
    })
  }

  render() {
    return <TextInput
      {...this.props}
      placeholderTextColor="#9e9e9e"
      multiline={true}
      underlineColorAndroid='transparent'
      onChange={this._onChange}
      placeholder='请输入问题描述（必填）'
      onContentSizeChange={(text) => console.log(text)}
      style={[styles.textInputStyle, {height: Math.max(35,this.state.height)}]}
    />
  }
}

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null, //图片数据
      text: '',           //输入的问题
      height: 1,
      deviceId: '',        //设备ID
      deviceName: '',
      location: '',
    };
    this._onChangeText = this._onChangeText.bind(this);
    this._onContentSizeChange = this._onContentSizeChange.bind(this);
    this._pickImage = this._pickImage.bind(this);
    this._submit = this._submit.bind(this);
    this._getInfo = this._getInfo.bind(this);
    this._uploadPicture = this._uploadPicture.bind(this);
  }
  static navigationOptions = ({ navigation }) => {//设置导航栏头部
    const {state, setParams} = navigation;
    return {
      header: <View style={stylesHeader.header}>
        <TouchableOpacity
          style={stylesHeader.back}
          onPress={() => navigation.dispatch(resetAction)}>
          <Image
            style={stylesHeader.backPic}
            source={require('../images/troubleReport/report_1/back.png')}/>
        </TouchableOpacity>
        <View style={stylesHeader.title}>
          <Text style={stylesHeader.titleName}>故障上报</Text>
        </View>
        <TouchableOpacity
          style={stylesHeader.titleRight}
          onPress={() => navigation.navigate('History')}>
          <Text style={stylesHeader.history}>历史记录</Text>
        </TouchableOpacity>
      </View>
    }
  };
  componentDidMount() {//在组件渲染之前判断是否有属性
    const {params} = this.props.navigation.state;
    if (params) {
        console.log(params.transCode);

      let url = config.local.base + config.local.getCode;
      let body = {device_code: params.transCode};
      request.get(url,body)
        .then((data) => {
        console.log(data);
        //let sss = Mock.mock(data);
          this.setState({
            deviceId: data.device_code,
            deviceName: data.device_name,
             location:data.device_location,
          })
      })
    }
  }

  _pickImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled image picker');
      }
      else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let source = {key:{ uri: response.uri }};
				 let source = { key: {uri: 'data:image/jpeg;base64,' + response.data }};
        console.log(source);
        let array = [];
        if (this.state.avatarSource && this.state.avatarSource.length) {
          array = this.state.avatarSource;
        }
        array.push(source);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: array,
        });
      }
    });
  }
  _onChangeText(newText) {
    this.setState({
      text: newText
    })
  }
  _extraUniqueKey() {
    let key = "aa" + parseInt(Math.random() * 1000);
    return key;
  }
  _showPic() {
    let pics = this.state.avatarSource;
    let length = pics.length;
    let width = 1;
    if (length > 3) {
      length = 3;
      width = length % 3;
    }
    let array = [];
    for(let i = 0 ; i < pics.length; i++ ){
      array.push(pics[i]);
    }

    return <FlatList
      numColumns={3}
      keyExtractor={this._extraUniqueKey}
      style={[styles.flatList,{width:80 * length,height: 70}]}
      data={array}
      renderItem={({item}) =>
        <Image
        style={styles.picSource}
        source={item.key}/>}
    />
  }
	 /*
	 componentDidMount() {//在组件渲染之前判断是否有属性
			const {params} = this.props.navigation.state;
			if (params) {
				 console.log(params.transCode);
				 
				 let url = config.local.base + config.local.getTrf;
				 let body = {deviceId: params.transCode};
				 request.get(url,body)
					 .then((data) => {
							console.log(data);
							console.log("abababaa")
							//let sss = Mock.mock(data);
							this.setState({
								 deviceId: data.transCode,
								 deviceName: data.name,
								 location:data.loc,
							})
					 })
			}
	 }*/
  
  _uploadPicture(url, params){
		 AsyncStorage.getItem('user')
       .then((data) => {
		   console.log(data);
       })
    request.post(url, params)
      .then((data) => {
      console.log("aaaaaaaaaaaaaaaa");
      })
    /*return new Promise(function (resolve, reject) {
			 let formData = new FormData();
			 for (let key in params) {
					formData.append(key, params[key]);
			 }
			 let file = {uri:params.path,type:'application/octet-stream',name:"image.jpg"}
			 formData.append("file", file);
			 console.log("a");
			 console.log(this.state.avatarSource);
			 console.log("b");
		})*/
  }
  _submit() {
    /*if ((this.state.text === "") | (this.state.deviceId === "")) {
      Alert.alert('请输入故障内容');
      return;
    }*/
		 AsyncStorage.getItem('user')
			 .then((user) => {
		      console.log(user);
					let url = config.local.base + config.local.upload_picture;
					let data = this.state.avatarSource;
					let formData = new FormData();
					//let file = {uri: data};
					formData.append("file",data);
					formData.append("username",user);
					formData.append("info", this.state.text);
					formData.append("deviceId", this.state.deviceId);
					this._uploadPicture(url, formData);
					const { navigate } = this.props.navigation;
					return this.props.navigation.dispatch(resetAction)
			 })
    
    //return navigate("Main");
  }

  _getInfo(text) {
    this.setState({
      text: text,
    })
  }
  _onContentSizeChange() {
    console.log("cccc")
  }
  
  
  render(){
    const { navigate } = this.props.navigation;
    let that = this;
    return (
      <View style={styles.content}>
        <View style={styles.contentTop}>
          <View style={[styles.items]}>
            <View  style={styles.itemMargin}>

              <Text style={styles.titleText}>设备编号</Text>
              <View style={styles.deviceIdAndScan}>
                <Text style={styles.deviceId}>{that.state.deviceId}</Text>
                <TouchableOpacity
                  style={styles.prCode}
                  onPress={() => navigate('QrCode',{user:this._getInfo})}>
                  <Image
                    style={styles.nextPage}
                    source={require('../images/troubleReport/report_1/nextpage.png')}/>
                </TouchableOpacity>
              </View>


            </View>
          </View>

          <View style={[styles.items]}>
            <View  style={styles.itemMargin}>
              <Text style={styles.titleText}>设备名称</Text>
              <Text style={styles.equname}>{that.state.deviceName}</Text>
            </View>
          </View>

          <View style={[styles.items]}>
            <View  style={styles.itemMargin}>
              <View style={styles.titlelocate}>
                <Text>区域位置</Text>
              </View>
              <Text style={styles.equname}>{that.state.location}</Text>
              {/*<TextInput style={styles.getlocate}
                         placeholderTextColor="#9e9e9e"
                         underlineColorAndroid="transparent" placeholder="请输入所在区域"/>*/}
              {/*<Text style={styles.titleText}>区域位置</Text>
              <Text>{that.state.location}</Text>
              <TextInput/>*/}
              {/*<TouchableOpacity
                style={styles.prCode}
                onPress={() => navigate('Location',{user:this._getInfo})}>
                <Image
                  style={styles.nextPage}
                  source={require('../images/troubleReport/report_1/nextpage.png')}/>
              </TouchableOpacity>*/}
            </View>
          </View>

          <View style={[styles.descripts]}>
              <Text style={styles.descriptQue}>问题描述</Text>
              <View style={styles.inputText}>
                <ReportInput
                  onChangeText={this._onChangeText}
                  style={styles.textInputStyle}/>
              </View>
          </View>

          <View style={styles.upload}>
            <View>
              <Text style={styles.uploadText}>上传图片</Text>
              <View style={styles.addPicContent}>
                <View style={styles.addPic}>
                  {/*{
                    this.state.avatarSource
                      ? <Image
                      style={styles.picSource}
                      source={this.state.avatarSource}/> : null
                  }*/}
                  {
                    this.state.avatarSource
                      ? this._showPic() : null
                  }
                </View>
                <View style={styles.addPic}>
                  <TouchableOpacity
                    onPress={this._pickImage}
                    style={styles.uploadPic}>
                    <Image source={require('../images/troubleReport/report_1/uploadpic.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

              <TouchableOpacity
                style={styles.submit}
                onPress={this._submit}>
                <Text style={styles.submitBtn}>提   交</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const stylesHeader = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#5bb7f5'
  },
  back: {
    justifyContent: 'center',
    flex: 2,
  },
  backPic: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 5,
    justifyContent: 'center',
  },
  titleName: {
    textAlign:'center',
    color: '#ffffff',
    fontSize: 17,
  },
  titleRight: {
    flex: 2,
    justifyContent: 'center',
  },
  history: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: '#ffffff',
  }
})
const styles = {
  content: {
    backgroundColor: '#ffffff',
    flex: 1,

  },
  contentTop: {
    flex: 1,
  },
  items: {
    justifyContent: 'center',
    minHeight: 50,
    borderBottomWidth:1,
    borderColor:'#ccc',
  },
  itemMargin: {
    justifyContent: 'space-between',
    flexDirection:'row',
    marginLeft: 15,
    marginRight: 15,
  },
  deviceIdAndScan: {
    flexDirection: 'row',
  },
	 equname:{
    marginRight:12,
   },
  prCode: {
    
    width: 10,
    alignItems:'flex-end',

  },
  titleText: {
    fontSize:15,
  },
	titlelocate:{
    justifyContent:'center',
    },
	
  deviceId: {
    marginRight: 3,
  },
  nextPage: {
    marginRight: 2,
    height:20,
    width:10,
  },
  descripts: {
    borderBottomWidth:1,
    borderColor:'#dcdcdc',
    flexDirection: 'row',
    minHeight: 100,
  },
  descriptQue: {
    textAlign: 'left',
    marginTop:15,
    marginLeft: 15,
    width: 80,
  },
  inputText: {
    marginTop:8,
    flex:3,
  },
  inputFrame: {
    width: width - 95,
    height: 100,
  },


  textInputStyle: { //文本输入组件样式
    width: width - 95,
    height: 50,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    color: '#9e9e9e'

  },
  upload: {
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight:15,
    /*borderWidth: 1,
    borderColor: 'red',*/

  },
  uploadText: {
    /*borderColor: 'red',
    borderWidth: 1,*/
    marginBottom: 15,
  },
  addPicContent: {
    /*borderColor: 'red',
    borderWidth: 1,*/
    flexDirection: 'row',
    height: 100,
    width: width,
  },
  uploadPic: {
    /*borderColor: 'red',
    borderWidth: 1,*/
    width: 65,
    height: 65,
    /*width: 40,
    height: 40,*/
  },

  addPicClick: {
    textAlign:'center',
    justifyContent:'center',
  },


  /*addPic: {
    flex: 1,
    flexDirection: 'row',
  },*/
  picSource: {
    marginBottom: 15,
    marginRight:15,
    width: 65,
    height: 65,
  },
  submit: {
    marginTop: 15,
    alignSelf: 'center',
    margin:"auto",
    width: width - 40,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#5bb7f5',
    justifyContent: 'center',
  },
  submitBtn: {
    fontSize: 17,
    color:'#ffffff',
    textAlign:'center',
    alignSelf: 'center',
    //justifyContent:'center',
    /*borderWidth: 1,
    borderColor: 'blue',*/
  },
  flatList: {
    width:100,
    height:40,
  }

}
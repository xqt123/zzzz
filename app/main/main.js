/**
 * Created by admin on 2017/5/24.
 */
import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  TextInput,
  Dimensions,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View
} from 'react-native';
import Report from '../troubleReport/report';
import { StackNavigator } from 'react-navigation';
import ReportNumber from '../troubleReport/reportNum';
import History from '../troubleReport/history';
import QrCode from '../troubleReport/qrCode';
import SelfInput from '../troubleReport/selfInput';
import Location from '../troubleReport/location';
import OrderProcess from '../workOrder/orderMain';
import StartInspection from '../workOrder/orderInspection/startInspection';
import OrderMaintain from '../workOrder/orderMaintain/orderMaintain';
import OrderTraffic from '../workOrder/orderTraffic/orderTraffic';
import EndInspection from '../workOrder/orderInspection/endInspection';
import EndMaintain from '../workOrder/orderMaintain/endMaintain';
import EndTraffic from '../workOrder/orderTraffic/endTraffic';

const {width, height} = Dimensions.get('window');

export default class Main extends Component{
  static navigationOptions = {
    header: false,
  }
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);

  }
  _dailyReport() {
    console.log("heiheie");
  }
  // 360高度
  render() {
    //console.log(this.props);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../images/main/group.png')}
            style={styles.headerUp}>
            <View style={styles.headertemp}>
              <Text style={styles.headerUpTemp}>35</Text>
              <View style={styles.headerUpContent}>
                <Text style={styles.air}>空气质量：优</Text>
                <View style={styles.tempHum}>
                  <Text style={styles.temp}>温度:35</Text>
                  <Text style={styles.hum}>湿度: 35度</Text>
                </View>
              </View>
              <Image
                style={styles.headerWeather}
                source={require('../images/main/cloudicon.png')}/>
            </View>

          </Image>

          <View style={styles.headerDown}>
            <TouchableOpacity style={styles.headerDownLeft}>
              <Image source={require('../images/main/alarm.png')}/>
              <Text style={styles.headerText}>报警提示</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerDownMid}>
              <Image source={require('../images/main/check.png')}/>
              <Text style={styles.headerText}>日常巡检</Text>
            </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerDownRight}
                onPress={() => navigate('Report')}
              >
                  <Image source={require('../images/main/trfreport.png')}/>
                  <Text style={styles.headerText}>日常上报</Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contenMid}>
          <View style={styles.contenMidIn}>
            <View style={styles.contenMidInTop}>
              <TouchableOpacity style={styles.contenMidInTopLeft}
                                onPress={() => navigate('OrderProcess')}>
                <Image source={require('../images/main/report.png')}/>
                <Text style={styles.headerText}>工单处理</Text>
                <Text style={styles.headerTextHandle}>您有2条工单未处理</Text>
              </TouchableOpacity>
              <View style={styles.contenMidInTopRight}>
                <View style={styles.contenMidInTopUp}>
                  <Image source={require('../images/main/personlocation.png')}/>
                  <Text style={styles.headerText}>人员定位</Text>
                  <Text style={styles.headerTextHandle}>附近500米有求助</Text>
                </View>
                <View style={styles.contenMidInTopDown}>
                  <Image source={require('../images/main/equcontrol.png')}/>
                  <Text style={styles.headerText}>设备控制</Text>
                  <Text style={styles.headerTextHandle}>您有三台设备有异常</Text>
                </View>
              </View>
            </View>
            <View style={styles.contenMidInBot}>
              <View style={styles.contenMidInBotLeft}>
                <Image source={require('../images/main/video.png')}/>
                <Text style={styles.headerText}>视频通话</Text>
                <Text style={styles.headerTextHandle}>实时监控已关闭</Text>
              </View>
              <View style={styles.contenMidInBotRight}>
                <Image source={require('../images/main/enviroment.png')}/>
                <Text style={styles.headerText}>视频通话</Text>
                <Text style={styles.headerTextHandle}>实时监控已关闭</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const SimpleApp = StackNavigator({//在此为导航栏到各个页面的页面名称
  Home: { screen: Main},
  Report: { screen: Report },
  ReportNum: {screen: ReportNumber},
  History: {screen: History},
  QrCode: {screen: QrCode},
  SelfInput: {screen: SelfInput},
  Location: {screen: Location},
  OrderProcess: {screen: OrderProcess},
  StartInspection: {screen: StartInspection},
  OrderMaintain: {screen: OrderMaintain},
  OrderTraffic: {screen: OrderTraffic},
  EndInspection: {screen: EndInspection},
  EndMaintain: {screen: EndMaintain},
  EndTraffic: {screen: EndTraffic},
},{ headerMode: 'screen' });
module.exports = SimpleApp;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f0f2f8',
  },
  header: {
    flex:7,
  },
  headerUp: {
    width:720,
    flex:9,
    alignItems: 'flex-end',
    flexDirection:'row',
  },
  headertemp:{
    flex:1,
    flexWrap:'nowrap',
    flexDirection:'row',
    padding:10,

  },
  headerUpTemp: {
    marginRight:14,
    marginLeft:20,
    fontSize:50,

  },
  headerUpContent: {
    paddingTop:10,
    marginLeft:20,

  },
  air: {
    fontSize:12,
    borderRadius:10,
    width:100,
    marginBottom:10,
    color:'white'
  },
  hum:{
    fontSize:12,
    marginLeft:18,
    color:'white'
  },
  tempHum: {
    flexDirection:'row',
  },
  temp:{
    fontSize:12,
    color:'white'
  },
  headerWeather: {
    marginTop:15,
    left: 60,

  },
  headerDown: {
    flex:5,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
  },
  headerDownLeft: {
    padding: 10,
    flex:1,
    alignItems:'center',
/*    borderWidth: 1,
    borderColor: 'red',*/
  },
  headerDownMid: {
    padding: 10,
    alignItems:'center',
    flex:1,
/*    borderWidth: 1,
    borderColor: 'red',*/
  },
  headerDownRight: {
    padding: 10,
    flex:1,
    alignItems:'center',
/*    borderWidth: 1,
    borderColor: 'red',*/
    //justifyContent: 'center',
  },
  report: {
    flex: 1,
  },
  headerText: {
    marginTop: height / 100,
  },
  headerTextHandle: {
    marginTop:5,
    fontSize:12,
    color:'#bebebe',
  },
  contenMid: {
    flex:9,
  },
  contenMidIn: {
    margin:10,
    flex:1,
  },
  contenMidInTop: {
    flex:20,
    flexDirection:'row',
  },
  contenMidInBot: {
    flexDirection:'row',
    marginTop:10,
    flex:13
  },
  contenMidInTopLeft: {
    flex:1,
    borderRadius:6,
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems:'center',
  },
  contenMidInTopRight: {
    flex:1,
    marginLeft:10,

    //backgroundColor:'#FFFFFF',
  },
  contenMidInTopUp: {
    marginBottom:5,
    flex:1,
    borderRadius:6,
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems:'center',
  },
  contenMidInTopDown: {
    flex:1,
    borderRadius:6,
    flexDirection: 'column',
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    justifyContent: 'center',
  },
  contenMidInBotLeft: {
    flex:1,
    borderRadius:6,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
  },
  contenMidInBotRight: {
    borderRadius:6,
    flex:1,
    marginLeft:10,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
  }
});
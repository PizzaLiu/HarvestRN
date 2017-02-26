/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Dimensions from 'Dimensions';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  TabBarIOS,
  Navigator,
  Image,
  TouchableWithoutFeedback,
  Button,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
var Webview = require('../common/webview');

//react-native-swRefresh
import {
  SwRefreshScrollView,
  SwRefreshListView,
  RefreshStatus,
  LoadMoreStatus
} from 'react-native-swRefresh'

let tempUrl = 'https://mp.weixin.qq.com/s?__biz=MjM5NDQ4NDYzOA==&mid=2658646218&idx=1&sn=55ecd2a51bbab91738865ebad407b684&chksm=bd04003b8a73892d11626d326048100c3b973c45ba3f1915a218148a2975bc7ddf4ce373836a&mpshare=1&scene=1&srcid=0226vvZyZGYuZI5pdYaWMywX&key=dc822e2267108c413b159b9b29b7af34fc9f2b05aab0022147177c35015e8fc1a922236dd184ba3ccb2c202cb2984a76cfa03f90442a88f87721525aee6abeac4404ee41166301b3790f74918d9bf0b1&ascene=0&uin=MjM4MTk2MjMwNA%3D%3D&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.12.2+build(16C67)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=eKLYVtzGKWgKC98c%2ByEYEBYnODym937We7J4vyP%2FSq4bf7oN5EPG3HbtpkrSi%2Bag';

let sliderData = [
  {
    title: '四重豪礼',
    img: 'https://www.dfsjr.com/res/upload/AdBannerAndAtlas/fca515d2-4b91-4b6f-bbcb-38f344c9036c.png',
    //url: 'http://m.dfsjr.com/Topic/Activity/FourGifts_DFS_ShareH5_021'
    url: tempUrl
  },
  {
    title: '新会员388元红包',
    img: 'https://www.dfsjr.com/res/upload/AdBannerAndAtlas/bb07dc21-d51a-4c7c-8597-c0193edbd0d7.png',
    //url: 'http://m.dfsjr.com/Topic/Activity/DFS_ShareH5_21'
    url: tempUrl
  },
  {
    title: '邀请好友送128现金',
    img: 'https://www.dfsjr.com/res/upload/AdBannerAndAtlas/37d731ee-d232-4f47-a5f4-bac29ea04223.png',
    //url: 'http://m.dfsjr.com/Topic/Activity/DFS_ShareH5_022'
    url: tempUrl
  },
  {
    title: '媒体关注',
    img: 'https://www.dfsjr.com/res/upload/AdBannerAndAtlas/20160330175437_0794.jpg',
    //url: ''
    url: tempUrl
  },
];

module.exports = React.createClass({

  getInitialState() {
    let _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    let data = []
    for (let i = 0;i<20;i++){
      data.push(i)
    }
    return {
      cycleProgressFill: 64,
      dataSource:_dataSource.cloneWithRows(data)
    }
  },

  _onRefresh(end) {
      let timer =  setTimeout(()=>{
       clearTimeout(timer)
       end()//刷新成功后需要调用end结束刷新

     },800)
  },

  _renderRow(rowData) {
    return (
      <View style={styles.cell}>
        <Text>{'这是第'+rowData+'行'}</Text>
      </View>)

  },

  _goWebPage: function(title, url){
    this.props.navigator.push({
      component: Webview,
      title: title,
      showTabBar: false,
      passProps:{
        title: title,
        url: url
      }
    });
  },

  render() {

    var sliderImgs = [];
    for (var i = 0; i < sliderData.length; i++) {
      var slider = sliderData[i];
      sliderImgs.push(
        <TouchableWithoutFeedback onPress={this._goWebPage.bind(this, slider.title, slider.url)}>
          <Image style={styles.slideImg} key={i.toString()} source={{uri: sliderData[i].img}} />
        </TouchableWithoutFeedback>
      );
    }
    let sliderDot = (<View style={{backgroundColor:'rgba(149, 165, 166, .8)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />);
    let sliderActiveDot = (<View style={{backgroundColor:'rgba(211, 84, 0,1.0)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />);

    return (
      <View style={styles.container}>
        <View style={styles.swiperWrapper}>
          <Swiper style={styles.swiper}
            autoplay={true} height={100} showsPagination={true}
            dot={sliderDot} activeDot={sliderActiveDot}
            paginationStyle={styles.pagi}>
             {sliderImgs[0]}
             {sliderImgs[1]}
             {sliderImgs[2]}
             {sliderImgs[3]}
          </Swiper>
        </View>
        <View style={styles.content}>
          <SwRefreshScrollView
            showsVerticalScrollIndicator={false}
            onRefresh={this._onRefresh}
            ref="listView">
            {/* counter */}
            <View style={styles.countWrapper}>
              <View style={styles.count1}>
                <Text style={styles.countP}>累计成交金额（元）</Text>
                <Text style={styles.countLabel}>13亿5720万8000元</Text>
              </View>
              <View style={styles.count2}>
                <Text style={styles.countP}>累计赚取收益（元）</Text>
                <Text style={styles.countLabel}>770万2092元</Text>
              </View>
            </View>

            {/* proList */}
            <View style={styles.proList}>
              <Image style={{position: 'absolute', right: 15, marginTop: -2}} source={require('../../images/hot_label.png')} />
              <View style={styles.proTitle}>
                <Text style={styles.proTitleMark}>债</Text>
                <Text style={styles.proTitleText}>大丰收170223000002</Text>
              </View>
              {/* TODO: fix this cycle progress hack */}
              <AnimatedCircularProgress
                size={160}
                width={8}
                fill={64}
                prefill={64}
                rotation={245}
                linecap="round"
                tintColor="#bdbdbd"
                backgroundColor="white"
                style={{alignSelf: 'center', height: 120, marginTop: 20, marginBottom: 20, overflow: 'hidden'}}
                >
              </AnimatedCircularProgress>
              <AnimatedCircularProgress
                size={160}
                width={8}
                fill={64}
                rotation={245}
                fill={this.state.cycleProgressFill}
                linecap="round"
                tintColor="#FF5907"
                backgroundColor="rgba(0, 0, 0, 0)"
                style={{backgroundColor: 'rgba(0, 0, 0, 0)', alignSelf: 'center', height: 120, marginTop: -140, overflow: 'hidden'}}
                >
                  {
                    (fill) => (
                      <View style={{flex:1, marginTop: -130, alignItems: 'center'}}>
                        <Text style={{color: '#bbb', fontSize: 11}}>预期年利率（%）</Text>
                        <Text style={{color: '#ff5907', fontSize: 33, fontWeight: 'bold', marginTop: 10}}>{ (9.50*((fill/64).toFixed(1))).toFixed(2) }</Text>
                        <Text style={{backgroundColor: '#ff5907', color: 'white', fontSize: 12, marginTop: 5}}>+2.00%</Text>
                      </View>
                    )
                  }
              </AnimatedCircularProgress>

              <View style={styles.info}>
                <View style={styles.infoEle}><Text style={styles.infoEleText}>95万</Text></View>
                <View style={styles.infoEle}><Text style={styles.infoEleText}>18天</Text></View>
                <View style={[styles.infoEle, {borderRightWidth: 0}]}>
                  <Text style={styles.infoEleText}>100元<Text style={{fontSize: 10, color: '#bbb'}}>起投</Text></Text>
                </View>
              </View>
              <TouchableWithoutFeedback>
                <View style={{marginTop: 5, backgroundColor: '#ddd', height: 40, borderRadius: 5, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>已满标</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <Text style={styles.endTitle}>没有更多数据了</Text>
          </SwRefreshScrollView>
        </View>
      </View>
    );
  },

  componentDidMount() {
    //this.refs.listView.setNoMoreData()
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  swiperWrapper: {
    height: 110,
    backgroundColor: '#eee'
  },
  swiper: {
  },
  slideImg: {
    flex: 1,
  },
  pagi: {
    bottom: 5
  },

  content: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },

  refreshTitle: {
    textAlign: 'center',
  },
  endTitle: {
    paddingTop: 5,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  countWrapper: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    height: 70,
    flexDirection: 'row',
  },
  count1: {
    flex: 1,
    borderStyle: 'solid',
    borderRightColor: '#DDD',
    borderRightWidth: 1,
    justifyContent: 'space-between',
  },
  count2: {
    flex: 1,
  },
  countP: {
    flex: 1,
    color: '#bbb',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    paddingBottom: 5,
    letterSpacing: 0.5,
  },
  countLabel: {
    flex: 1,
    color: '#ffba00',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontSize: 13,
  },

  proList: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    // TODO: remove this magic number
    height: Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.TotalNavHeight - 110 - 128,
    backgroundColor: 'white',
  },
  proTitle: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderStyle: 'solid',

  },
  proTitleMark: {
    width: 16,
    height: 16,
    lineHeight: 14,
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff5723',
    color: '#ff5907',
    textAlign: 'center',
    fontSize: 10,
    padding: 0,
    margin: 0,
    marginRight: 5,
  },
  proTitleText: {
    color: '#666',
    fontSize: 12,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  infoEle: {
    flex: 1,
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  infoEleText: {
    textAlign: 'center',
    color: '#999',
    fontWeight: '500',
  },
});

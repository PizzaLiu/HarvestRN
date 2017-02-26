/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var Sample = require('./ios_views/sample');
var Home = require('./ios_views/home/home');

let primaryColor = '#FFDA44';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  TabBarIOS,
  StatusBar,
  NavigatorIOS,
  Image,
  View
} from 'react-native';


export default class HarvestRN extends Component {
  state = {
    selectedTab: '首页',
  };

  _renderContent(component: Component, title: ?string) {
    return (
      <NavigatorIOS style={styles.wrapper}
        ref='nav'
        barTintColor={primaryColor}
        configureScene={()=>{return NavigatorIOS.SceneConfigs.PushFromRight;}}
        titleTextColor='#333'
        shadowHidden={true}
        initialRoute={{
          component: component,
          title: title,
          name: title,
          showTabBar: true,
          backButtonTitle: ' ',
          index:0,
        }}
      />
    );
  }

  render() {

    var homeTitle = '首页';
    var isHomeActive = this.state.selectedTab === homeTitle;
    var iconHome = require('./images/icon_home.png');
    var iconHomeSelected =  require('./images/icon_home_selected.png');

    var financialTitle = '理财';
    var isFinancialActive = this.state.selectedTab === financialTitle;
    var iconFinancial = require('./images/icon_financial.png');
    var iconFinancialSelected = require('./images/icon_financial_selected.png');

    var housekeeperTitle = '我的管家';
    var isHousekeeperActive = this.state.selectedTab === housekeeperTitle;
    var iconHousekeeper = require('./images/icon_housekeeper.png');
    var iconHousekeeperSelected = require('./images/icon_housekeeper_selected.png');

    return (
      <TabBarIOS tintColor="#353535"
        ref="tabbar"
                 barTintColor="white">
        <TabBarIOS.Item
          title={homeTitle}
          renderAsOriginal={true}
          selected={isHomeActive}
          icon={iconHome}
          enderIcon={() => <Image source={iconHome} />}
          renderSelectedIcon={() => <Image source={iconHomeSelected} />}
          selectedIcon={iconHomeSelected}
          onPress={() => {
            this.setState({
              'selectedTab': homeTitle
            });
          }}>
          {this._renderContent(Home, '大丰收金融')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={financialTitle}
          renderAsOriginal={true}
          selected={isFinancialActive}
          icon={iconFinancial}
          selectedIcon={iconFinancialSelected}
          onPress={() => {
            this.setState({
              'selectedTab': financialTitle
            });
          }}>
          {this._renderContent(Sample, financialTitle)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={housekeeperTitle}
          renderAsOriginal={true}
          selected={isHousekeeperActive}
          icon={iconHousekeeper}
          selectedIcon={iconHousekeeperSelected}
          onPress={() => {
            this.setState({
              'selectedTab': housekeeperTitle
            });
          }}>
          {this._renderContent(Sample, housekeeperTitle)}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HarvestRN', () => HarvestRN);

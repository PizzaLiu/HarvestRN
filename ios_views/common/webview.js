import React, { Component } from 'react';
import { WebView, View } from 'react-native';

module.exports = React.createClass({
  render: function(){
    return (
      <WebView
        style={{flex: 1,backgroundColor: 'rgba(1, 2, 3, 0)'}}
        source={{uri: this.props.url}}
        opaque={false}
      />
    );
  }
});

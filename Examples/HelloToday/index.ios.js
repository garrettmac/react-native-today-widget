/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import widget from 'react-native-today-widget';

const HelloToday = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit index.ios.js
    </Text>
    <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
    </Text>
  </View>
);

const TodayWidget = () => {
  const isExpandable = true;
  const maxHeight = 500;
  widget.setExpandable(isExpandable, maxHeight);
  const onLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    if (height <= 110) {
      console.log('widget is in compact mode');
    } else if (height > 110) {
      console.log('widget is in expanded mode');
    }
  };
  return (
    <View
      onLayout={onLayout}
      style={styles.widget}
    >
      <Text style={styles.welcome}>
        Hello Today Widget!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  widget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HelloToday', () => HelloToday);
AppRegistry.registerComponent('TodayWidgetExtension', () => TodayWidget);
export default HelloToday;

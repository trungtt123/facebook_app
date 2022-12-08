import React, { Component } from 'react';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

export default class DatePicker extends Component {
  render() {
    return (
      <ScrollPicker
        dataSource={['1', '2', '3', '4', '5', '6']}
        selectedIndex={1}
        renderItem={(data, index) => {
          //
        }}
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={180}
        wrapperWidth={150}
        wrapperColor='#FFFFFF'
        itemHeight={60}
        highlightColor='#d8d8d8'
        highlightBorderWidth={2}
      />
    );
  }
}
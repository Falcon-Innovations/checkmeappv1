import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utility';
import BodyPart from './BodyPart';

const HorizontalScrollbar = ({data, bodyPart, setBodyPart}) => {
  return (
    <>
      {data.map(item => {
        return (
          <View key={item.id || item}>
            <BodyPart
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          </View>
        );
      })}
    </>
  );
};

export default HorizontalScrollbar;

const styles = StyleSheet.create({});

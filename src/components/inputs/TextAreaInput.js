import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

function TextAreaInput(props) {
  const { value, onChangeText, ...rest } = props;
  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Description(optional)"
        placeholderTextColor="#C1C1C1"
        numberOfLines={10}
        multiline
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}

export default TextAreaInput;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: '#C1C1C1',
    borderRadius: 8,
    backgroundColor: '#fff',
    // marginTop: 15,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});

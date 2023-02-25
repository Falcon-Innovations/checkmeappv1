import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Modal from 'react-native-modal';
import AppButton from './utils/AppButton';
import { COLORS } from '../utility';

function NoInternetModal({ show, onRetry, isRetrying }) {
  return (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}> Connection Error </Text>
        <Text style={styles.modalText}>
          Oops!Looks like your device is not connected to the Internet.
        </Text>
        <AppButton
          color={COLORS.primary}
          text="Try Again"
          onPress={() => onRetry()}
          disabled={isRetrying}
        />
      </View>
    </Modal>
  );
}

export default NoInternetModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

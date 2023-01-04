import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppStatusBar, CustomStatusBar} from '../../components';
import SearchExercises from './SearchExercises';
import {COLORS} from '../../utility';
import Exercises from './Exercises';

const SportHome = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);

  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar text={'Sport Home'} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{marginBottom: 10, paddingHorizontal: 10}}>
          <SearchExercises
            setExercises={setExercises}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        </View>

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15}}
          showsVerticalScrollIndicator={false}>
          <Exercises
            setExercises={setExercises}
            exercises={exercises}
            bodyPart={setBodyPart}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SportHome;

const styles = StyleSheet.create({});

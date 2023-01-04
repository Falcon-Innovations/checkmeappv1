import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES} from '../../utility';
import ExerciseCard from '../../components/ExerciseCard';
import {exerciseOptions, fetchData} from '../../hooks/fetchData';

const Exercises = ({exercises, setExercises, bodyPart}) => {
  useEffect(() => {
    const fetchExerciseData = async () => {
      let exerciseData = [];

      if (bodyPart === 'all') {
        exerciseData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions,
        );
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions,
        );
      }
      setExercises(exerciseData);
    };
    fetchExerciseData();
  }, [bodyPart]);

  return (
    <>
      {exercises?.map((exercise, index) => {
        return <ExerciseCard key={index} exercise={exercise} />;
      })}
    </>
  );
};

export default Exercises;

const styles = StyleSheet.create({});

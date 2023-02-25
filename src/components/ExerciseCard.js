import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SIZES } from '../utility';

function ExerciseCard({ exercise }) {
  return (
    <TouchableOpacity style={styles.exeercisStyle}>
      <View style={styles.content}>
        <View style={styles.catContainer}>
          <View style={styles.catContent}>
            <View style={[styles.cat, { backgroundColor: '#664696' }]}>
              <Text style={[styles.title, {}]}>{exercise.bodyPart}</Text>
            </View>
            <View
              style={[
                styles.cat,
                { backgroundColor: '#F0805B', marginLeft: 12 },
              ]}>
              <Text style={[styles.title, {}]}>{exercise.target}</Text>
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>
        </View>

        <Image
          source={{ uri: exercise.gifUrl }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

export default ExerciseCard;

const styles = StyleSheet.create({
  exeercisStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F7CED7FF',
    borderRadius: SIZES.borderRadius,
    marginBottom: 14,
  },
  content: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  catContainer: {},
  catContent: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  cat: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 10,
    // fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    width: SIZES.screenWidth - 150,
    textTransform: 'capitalize',
  },
});

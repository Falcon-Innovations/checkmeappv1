import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

import {
  fetchData,
  exerciseOptions,
  useFetching,
  exerciseOption,
} from '../../hooks/fetchData';
import {COLORS, SIZES} from '../../utility';
import HorizontalScrollbar from './HorizontalScrollbar';
import {useNavigation} from '@react-navigation/native';
import {SimpleLoader} from '../../components';

const SearchExercises = ({setExercises, setBodyPart, bodyPart}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [load, error, data, fetchExercise] = useFetching(
    'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    exerciseOption,
  );

  const onChangeSearch = query => setSearch(query);

  //   fetchCategories
  useEffect(() => {
    const updateData = navigation.addListener('focus', () => {
      fetchExercise();
    });
    return updateData;
  }, [navigation]);

  useEffect(() => {}, []);

  //search
  const handleSearch = async () => {
    if (search) {
      setLoading(true);
      const exerciseData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions,
      );
      const searchedExercises = exerciseData.filter(
        exercise =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search),
      );

      setSearch('');
      setExercises(searchedExercises);
      setLoading(false);
    }
  };
  const bodyParts = ['all', ...data];

  return (
    <>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search News"
          placeholderTextColor="#D2D1D1"
          onChangeText={onChangeSearch}
          value={search}
          style={{
            elevation: 0,
            borderWidth: 0.6,
            borderColor: '#EB3E95',
            width: SIZES.screenWidth - 100,
          }}
          inputStyle={{
            fontSize: 14,
            fontFamily: 'Poppins_Regular',
          }}
          iconColor="#D2D1D1"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Icon name="search" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {load || loading ? (
        <SimpleLoader />
      ) : (
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 4, paddingBottom: 8}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        </ScrollView>
      )}
    </>
  );
};

export default SearchExercises;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBtn: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginLeft: 10,
  },
});

//   useEffect(() => {
//     setLoading(true);
//     const fetchExercisesData = async () => {
//       const bodyPartsData = await fetchData(
//         'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
//         exerciseOptions,
//       );

//       setBodyParts(['all', ...bodyPartsData]);
//       setLoading(false);
//     };
//     fetchExercisesData();
//     console.log('====================================');
//     console.log('Execises', bodyParts);
//     console.log('====================================');
//   }, []);

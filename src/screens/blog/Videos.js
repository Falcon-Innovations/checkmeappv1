import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import React,{useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { SimpleLoader, VideoSlider } from '../../components';
import { COLORS, SIZES } from '../../utility';


  const API_KEY = 'AIzaSyC-D8MvQ1lAKpdAesCWhoIlg78CV0EqFi4';
  const CHANNEL_ID = 'UCHAT6PG9yT0ughwqtO5wsng';

const Videos = () => {
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
 const [selectedVideo, setSelectedVideo] = useState(null);

 
  useEffect(() => {
    fetchYouTubeChannelData();
  }, []);

const fetchYouTubeChannelData = async () => {
  try {
    setLoading(true)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch channel data');
    }

    const data = await response.json();
    const filteredData = filterDataByVideoId(data?.items);
    setVideos(filteredData);
    setLoading(false)
  } catch (error) {
    console.error(error);
  }
};

const filterDataByVideoId = (data) => {
  return data.filter((item) => item.id.kind === 'youtube#video');
};

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };


        const onStateChange = (state) => {
          if (state === 'ended') {
            setPlaying(false);
          }
          if (state !== 'playing') {
            setPlaying(false);
          }
        };

        const renderVideoItem = ({ item }) => (
          <TouchableOpacity style={{marginRight:12}} onPress={() => handleVideoPress(item)}>
            <ImageBackground
              resizeMode="contain"
              source={{ uri: item?.snippet?.thumbnails?.medium?.url }}
              borderRadius={6}
              style={{
                width: SIZES.screenWidth * 0.5,
                height: SIZES.screenHeight * 0.17,
              }}>
              <View style={styles.overlay}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="play-circle" size={40} color="#fff" />
                </View>
                <View style={styles.content}>
                  <Text style={styles.textStyle}>{item?.snippet?.title}</Text>
                  {/* <Text style={styles.date}>{item?.snippet?.publishedAt}</Text> */}
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );

  return (
    <View>
      {loading ? (
        <SimpleLoader />
      ) : (
        <>
          {selectedVideo ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius: SIZES.screenWidth * 0.5,
                  position: 'absolute',
                  height: 32,
                  width: 32,
                  top: 20,
                  left: SIZES.screenWidth * 0.8,
                  zIndex: 1,
                }}
                onPress={() => setSelectedVideo(null)}>
                <Icon name="backspace-outline" size={24} />
              </TouchableOpacity>
              <YoutubePlayer
                height={200}
                play={playing}
                videoId={selectedVideo?.id?.videoId}
                webViewStyle={{
                  borderRadius: SIZES.borderRadius,
                }}
                onChangeState={onStateChange}
              />
            </View>
          ) : (
            <FlatList
              data={videos}
              keyExtractor={(item) => item.id.videoId}
              renderItem={renderVideoItem}
              horizontal
            />
          )}
        </>
      )}
    </View>
  );
}

export default Videos

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(40,40,40,0.377)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignContent:"center",
    justifyContent:"center",
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#fff',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    color: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});






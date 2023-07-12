import { FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import moment from 'moment';

// import fetch from 'node-fetch';

import { SimpleLoader, VideoSlider } from '../../components';

  const API_KEY = 'AIzaSyC-D8MvQ1lAKpdAesCWhoIlg78CV0EqFi4';
  const CHANNEL_ID = 'UChrNVKqgVXoAd-drRtXlezw';

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



console.log('====================================');
console.log("Video Titkes",videos);
console.log('====================================');



        const onStateChange = (state) => {
          if (state === 'ended') {
            setPlaying(false);
          }
          if (state !== 'playing') {
            setPlaying(false);
          }
        };

        const renderVideoItem = ({ item }) => (
          <View style={styles.videoItem}>
            <Image
              source={{ uri: item?.snippet?.thumbnails?.medium?.url }}
              style={styles.thumbnail}
            />
            <Text style={styles.videoTitle}>{item.snippet.title}</Text>
          </View>
        );

  return (
    <View>
      {loading ? (
        <SimpleLoader />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.videoId}
          renderItem={({ item }) => (
            <VideoSlider
              coverImg={item?.snippet?.thumbnails?.medium?.url}
              title={item?.snippet?.title}
              date={moment(item?.snippet?.publishedAt).format('ll')}
            />
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default Videos

const styles = StyleSheet.create({})
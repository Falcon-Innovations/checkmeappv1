import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const onMessageRecieved = async (message) => {
  console.log('onMessageRecieved', JSON.stringify(message));
  console.log(message?.notification?.title);
  try {
    await notifee.displayNotification({
      title: message?.notification?.title,
      body: message?.notification?.body,
      android: {
        channelId: 'test',
      },
    });
  } catch (error) {
    console.log(error, 'Error From FCM');
  }
};

const useInitFCM = () => {
  const getFCMToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    try {
      const token = await messaging().getToken();
      console.log('Firebase token', token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFCMToken();
    const unsubscribeToForgroundMsgs = messaging().onMessage(onMessageRecieved);

    messaging().onNotificationOpenedApp(onMessageRecieved);

    messaging().getInitialNotification().then(onMessageRecieved);

    return unsubscribeToForgroundMsgs;
  }, []);

  return null;
};

export default useInitFCM;

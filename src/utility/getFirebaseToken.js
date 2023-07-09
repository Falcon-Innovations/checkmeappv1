import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';

// const onMessageRecieved = (message) => notifee.displayNotification(JSON.parse(message.data.notifee));

const useGetFirebaseToken = () => {
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
    const unsubscribeToForgroundMsgs = messaging().onMessage(
      async (remoteMessage) => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      },
    );

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });

    return unsubscribeToForgroundMsgs;
  }, []);

  return null;
};

export default useGetFirebaseToken;

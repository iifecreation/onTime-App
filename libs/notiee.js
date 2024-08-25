import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native"

const localNotifcataion = async () => {

    await notifee.requestPermission()

    const channel_id = Date.now()
    const channelId = 'ID-' + channel_id
    
    await notifee.createChannel({
        id: channelId,
        name: 'Default Channel', 
        sound: "default",
        importance: AndroidImportance.DEFAULT,
        vibration: true,
        visibility: AndroidVisibility.PUBLIC
    })

    await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',

        android: {
          channelId,
          color: "#4caf50",
          actions: [
            {
                title: "hello",
                pressAction: {id: "dance"}
            },
            {
                title: "hello",
                pressAction: {id: "cry"}
            }
          ]
        },
    });

    notifee.onForegroundEvent(async (event) => {
        console.log("onForegroundEvent", event);
        
    })
}

export default localNotifcataion
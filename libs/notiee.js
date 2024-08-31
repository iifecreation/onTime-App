import notifee, { AndroidImportance, AndroidVisibility, EventType, TriggerType } from "@notifee/react-native";
import { saveNotificationData } from "../database/db-service";

const localNotification = async (db, title, note, repeatTime, reminderDate, setNotification, setShowNotified) => {
    await notifee.requestPermission();

    const channelId = `channel-${Date.now()}`;

    try {
        await notifee.createChannel({
            id: channelId,
            name: 'Default Channel',
            sound: "default",
            importance: AndroidImportance.DEFAULT,
            vibration: true,
            visibility: AndroidVisibility.PUBLIC,
        });
    } catch (error) {
        console.error(error);
    }

    const notification = {
        channelId: channelId,
        title: title,
        createdAt: new Date().toISOString(),
        read: false,
    };

    const remindDate = new Date(reminderDate).getTime();

    const initialTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: remindDate,
    };

    try {
        await notifee.createTriggerNotification(
            {
                title: title,
                body: note,
                android: {
                    channelId,
                    color: "#ffffff",
                    smallIcon: "ic_launcher",
                },
            },
            initialTrigger,
        );
        // Store the notification in the database once
        await storeNotification(db, notification, setNotification, setShowNotified);

    } catch (error) {
        console.error('Error creating initial notification:', error);
    }


    // Schedule repeated notifications
    for (let i = 1; i < repeatTime; i++) {
        const nextTriggerTime = new Date(remindDate + i * 1000); // Increase time by 1 second for each repeat
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: nextTriggerTime.getTime(),
        };

        await notifee.createTriggerNotification(
            {
                title: title,
                body: note,
                android: {
                    channelId,
                    color: "#ffffff",
                    smallIcon: "ic_notification", // Use your icon resource here
                },
            },
            trigger,
        );
    }

    notifee.onForegroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        if (type === EventType.PRESS) {
            console.log('User pressed the notification:');
            // Handle the press action
        }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        if (type === EventType.PRESS) {
            console.log('User pressed the notification in the background:');
            // Handle the press action
        }
    });
};

const storeNotification = async (db, notification, setNotification, setShowNotified) => {
    try {
        const storedData = await saveNotificationData(db, notification);
        setNotification(storedData);
        setShowNotified(true);
    } catch (error) {
        console.error('Error saving notification:', error);
    }
};

export default localNotification;

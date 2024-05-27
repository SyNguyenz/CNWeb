import { useContext, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { base_url} from '../../api/api';
import AllApi from '../../api/api';

const useSignalR = (onReceiveMessage, group) => {
    const isLoggedIn = localStorage.getItem("user");
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(base_url + "notificationHub")
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", (message) => onReceiveMessage(message));

        const startConnection = async () => {
            try {
                await connection.start();
                const response = await AllApi.getUserInfo();
                if (response && response.data) {
                    connection.invoke("SendConnectionIdToServer", response.data.id, connection.connectionId);
                    connection.invoke("AddToGroup", group);
                } else {
                    throw new Error('Invalid user info response');
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem("user");
                window.location.reload();
            }
        };
        if (isLoggedIn) {
            startConnection();
        }

        return async () => {
            if (connection.state === signalR.HubConnectionState.Connected) {
                console.log(connection.state);
                await connection.invoke("RemoveFromGroup", group)
                .then(() => {
                    console.log("Removed from group successfully.");
                })
                .catch((err) => {
                    console.error("Error removing from group:", err);
                });
                await connection.stop()
                    .catch((err) => {
                        console.error("Error stopping SignalR connection:", err);
                    });
            } else {
                console.log("SignalR connection is not in the 'Connected' state.");
            }
        };
    }, [ isLoggedIn]);
};

export default useSignalR;
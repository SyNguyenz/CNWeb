import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import {AllApi, base_url} from '../../api/api';

const useSignalR = (onReceiveMessage) => {
    const group = '';
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(base_url + "notificationHub")
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", onReceiveMessage);


        connection.start()
            .then(async () => {
                const response = await AllApi.getUserInfo();
                connection.invoke("SendConnectionIdToServer", response.data.id, connection.connectionId);
                connection.invoke("AddToGroup", group);
            })
            .catch((err) => console.error("Error connecting to SignalR hub", err));

        return () => {
            connection.stop()
                .then(() => connection.invoke("RemoveFromGroup", group))
                .catch((err) => console.error("Error disconnecting from SignalR hub", err));
        };
    }, [onReceiveMessage]);
};

export default useSignalR;
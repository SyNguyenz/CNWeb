import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const useSignalR = (onReceiveMessage, onNewOrderCreated) => {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7006/notificationHub")
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", onReceiveMessage);

        connection.on("NewOrderCreated", onNewOrderCreated);

        connection.start()
            .then(() => console.log("Connected to SignalR hub"))
            .catch((err) => console.error("Error connecting to SignalR hub", err));

        return () => {
            connection.stop()
                .then(() => console.log("Disconnected from SignalR hub"))
                .catch((err) => console.error("Error disconnecting from SignalR hub", err));
        };
    }, [onReceiveMessage, onNewOrderCreated]);
};

export default useSignalR;
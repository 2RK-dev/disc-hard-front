import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

let stompClient: Client | null;
const subscriptionMap: Map<string, StompSubscription> = new Map();

const createClient = (token: string): Client => {
    return new Client({
        brokerURL: "ws://localhost:8080/ws",
        connectHeaders: {Authorization: `Bearer ${token}`},
        reconnectDelay: 5000,
        onStompError: (frame) => console.error("[STOMP] Error", frame),
        onConnect: () => console.log("[STOMP] Connected"),
        onDisconnect: () => console.log("[STOMP] Disconnected"),
        onWebSocketClose: () => console.log("[STOMP] WebSocket closed"),
        onWebSocketError: () => console.error("[STOMP] WebSocket error"),
    });
};

export const init = async (token: string) => {
    if (stompClient) {
        await disconnect();
    }
    stompClient = createClient(token);
    stompClient.activate();
}

export const disconnect = async () => {
    if (stompClient) {
        await stompClient.deactivate();
        stompClient = null;
    }
}

export const subscribe = (destination: string, callback: (message: IMessage) => void) => {
    if (!stompClient) {
        console.error("[STOMP] Client not initialized");
        return;
    }
    if (!subscriptionMap.has(destination)) {
        const subscription = stompClient.subscribe(destination, callback);
        subscriptionMap.set(destination, subscription);
    }
}

export const unsubscribe = (destination: string) => {
    if (!stompClient) {
        console.error("[STOMP] Client not initialized");
        return;
    }
    const subscription = subscriptionMap.get(destination);
    if (subscription) {
        subscription.unsubscribe();
        subscriptionMap.delete(destination);
    }
}

export const publish = (destination: string, message: unknown) => {
    if (!stompClient) {
        console.error("[STOMP] Client not initialized");
        return;
    }
    stompClient.publish({destination, body: JSON.stringify(message)});
}
import type { ITransmitter } from "../../ports/Transmitter";
import type { SensorData } from "../../domain/sensorData";


export class WSTransmitter implements ITransmitter {

    private _socket: WebSocket;

    constructor(address: string) {
        this._socket = this.startConnection(address);
    }

    async sendData(data: SensorData): Promise<void> {
        const payload = JSON.stringify(data);
        this._socket.send(payload);
    }

    /**
     * Starts a new WebSocket connection.
     * @param target The server address.
     * @returns The connection object.
     */
    private startConnection(target: string): WebSocket {
        try {
            const socket = new WebSocket(target);
            return socket;
        }

        catch (err) {
            throw new Error(
                `Failed to start WebSocket connection due to the following error: ${JSON.stringify(err)}`
            );
        }
    }

    /**
     * Change the host address of the target websocket server.
     * @param address The new server URL.
     */
    changeTargetAddress(address: string) {
        this.destroy();
        this._socket = this.startConnection(address);
    }

    /**
     * Destroy the current connection.
     */
    destroy(): void {
        this._socket.close(1000);
    }
}

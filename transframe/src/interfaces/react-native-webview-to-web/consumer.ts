import type { TransframeConsumerInterface } from "../types";

export class ReactNativeWebviewToWebConsumerInterface
  implements TransframeConsumerInterface
{
  private _isConnected: boolean = false;
  private _messageHandler: (message: unknown) => void = () => {};
  private _messageHandlerWrapper: (event: MessageEvent) => void;

  constructor() {
    this._messageHandler = () => {};
    this._messageHandlerWrapper = (event) => {
      try {
        if (typeof event.data === "string" && event.data.startsWith('{')) this._messageHandler(JSON.parse(event.data));
        else this._messageHandler(event.data);
      } catch {}
    }
  }

  public get isConnected() {
    return this._isConnected;
  }

  public connect() {
    // capture = true is req for some reason
    window.addEventListener?.('message', this._messageHandlerWrapper, true);
    this._isConnected = true;
  }

  public disconnect() {
    // capture = true is req for some reason
    window.removeEventListener?.('message', this._messageHandlerWrapper, true);
    this._isConnected = false;
  }

  public sendMessage(message: unknown) {
    if (typeof message !== 'string') message = JSON.stringify(message);
    window.ReactNativeWebView?.postMessage(message as string);
  }

  onMessage(callback: (message: unknown) => void): void {
    this._messageHandler = callback;
  }
}

import type { TransframeConsumerInterface } from "../types";
import type { WebToReactNativeWebviewConsumerInterfaceOptions } from "./types";
import type { WebViewMessageEvent } from "react-native-webview";

export class WebToReactNativeWebviewConsumerInterface
  implements TransframeConsumerInterface
{
  private _options: WebToReactNativeWebviewConsumerInterfaceOptions;
  private _isConnected: boolean = false;
  private _messageHandler: (message: unknown) => void = () => {};
  private _messageHandlerWrapper: (event: WebViewMessageEvent) => void;

  constructor(options: WebToReactNativeWebviewConsumerInterfaceOptions) {
    this._options = options;
    this._messageHandler = () => {};
    this._messageHandlerWrapper = (message) => {
      // only process messages from the allowed origins
      if (this._options?.allowedOrigins?.length) {
        // can't use new URL(...).origin because it doesn't work with react-native
        const parts = message.nativeEvent.url.split("/");
        const origin = parts.slice(0, 3).join("/");
        if (!this._options.allowedOrigins.includes(origin)) return;
      }
      this._messageHandler(JSON.parse(message.nativeEvent.data));
    }
  }

  public get isConnected() {
    return this._isConnected;
  }

  public connect() {
    this._options.addMessageListener(this._messageHandlerWrapper);
    this._isConnected = true;
  }

  public disconnect() {
    this._options.removeMessageListener(this._messageHandlerWrapper);
    this._isConnected = false;
  }

  public sendMessage(message: unknown) {
    this._options.webviewRef.current?.postMessage(typeof message === 'string' ? message : JSON.stringify(message));
  }

  onMessage(callback: (message: unknown) => void): void {
    this._messageHandler = callback;
  }
}

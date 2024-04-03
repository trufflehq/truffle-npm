import type { RPCReplyFunction } from "../../rpc/types";
import type { Context } from "../../types";
import type { TransframeProviderInterface } from "../types";
import type { WebToReactNativeWebviewInterfaceContext } from "./types";

// it isn't really documented, but react-native-webview has a postMessage method
// https://github.com/react-native-webview/react-native-webview/blob/4197bb42ce79406ff20c7e5637f78e44ca45474c/example/examples/CustomMenu.tsx#L74

export class WebToReactNativeWebviewProviderInterface implements 
  TransframeProviderInterface<never, WebToReactNativeWebviewInterfaceContext> {

  private _isListening: boolean = false;
  private _messageHandler: (message: MessageEvent, reply: RPCReplyFunction, context: Context<WebToReactNativeWebviewInterfaceContext>) => void = () => {};

  private _messageHandlerWrapper = (event: MessageEvent) => {
    // TODO: can we limit the origins to only accept from react native?

    
    const replyFn: RPCReplyFunction = (message: unknown) => {
      if (typeof message !== 'string') message = JSON.stringify(message);
      window.ReactNativeWebView?.postMessage(message as string);
    };
    
    // I'm not sure what we should use to identify the consumer...
    const fromId = undefined;
    const context: Context<WebToReactNativeWebviewInterfaceContext> = {
      fromId,
    };
    
    // call the message handler set by the user
    if (typeof event.data === "string") this._messageHandler(JSON.parse(event.data), replyFn, context);
    else this._messageHandler(event.data, replyFn, context);
  };

  public get isListening() {
    return this._isListening;
  }

  public listen() {
    // capture = true is req for some reason
    window.addEventListener?.('message', this._messageHandlerWrapper, true);
    this._isListening = true;
  }

  public close() {
    // capture = true is req for some reason
    window.addEventListener?.('message', this._messageHandlerWrapper, true);
    this._isListening = false;
  }

  onMessage(callback: (message: unknown, reply: RPCReplyFunction, context: Context<WebToReactNativeWebviewInterfaceContext>) => void): void {
    this._messageHandler = callback;
  }

  registerFrame(_frame: never, _id: string): void {
    console.warn("Method not implemented.");
  }
}

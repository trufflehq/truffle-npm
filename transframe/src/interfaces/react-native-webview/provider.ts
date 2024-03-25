import type { WebViewMessageEvent } from "react-native-webview";
import type { RPCReplyFunction } from "../../rpc/types";
import type { Context } from "../../types";
import type { TransframeProviderInterface } from "../types";
import type { ReactNativeWebviewInterfaceContext, ReactNativeWebviewProviderInterfaceOptions } from "./types";

// it isn't really documented, but react-native-webview has a postMessage method
// https://github.com/react-native-webview/react-native-webview/blob/4197bb42ce79406ff20c7e5637f78e44ca45474c/example/examples/CustomMenu.tsx#L74

export class ReactNativeWebviewProviderInterface implements 
  TransframeProviderInterface<never, ReactNativeWebviewInterfaceContext> {

  private _options: ReactNativeWebviewProviderInterfaceOptions;
  private _isListening: boolean = false;
  private _messageHandler: (message: WebViewMessageEvent, reply: RPCReplyFunction, context: Context<ReactNativeWebviewInterfaceContext>) => void = () => {};

  constructor(options: ReactNativeWebviewProviderInterfaceOptions) {
    this._options = options;
  }

  private _messageHandlerWrapper = (message: WebViewMessageEvent) => {        
    // only process messages from the allowed origins
    if (this._options?.allowedOrigins?.length) {
      // can't use new URL(...).origin because it doesn't work with react-native
      const parts = message.nativeEvent.url.split("/");
      let origin = parts.slice(0, 3).join("/");
      if (parts[2].includes(':')) origin = parts.slice(0, 4).join("/");
      if (!this._options.allowedOrigins.includes(origin)) return;
    }

    // the user will use this to reply to the consumer
    // NOTE: react-native-webview doesn't inject our javascript into iframes. but it does inject
    // window.ReactNativeWebView.postMessage, so we can use that to communicate with the parent.
    // the problem is with replying. the reply postMessage will be sent to the parent, but the parent
    // will not know which iframe the message is coming from. so we need to add the iframe id to the
    // message and then the parent can send the reply to the correct iframe.
    const replyFn: RPCReplyFunction = (message) => {
      // only send the message if the consumer is still connected
      this._options.webviewRef.current?.postMessage(JSON.stringify({
        ...message,
        _reactNativeWebview: true
      }));
    };
    
    // I'm not sure what we should use to identify the consumer...
    // TODO: ideally we identify the iframe so we don't have to relay to all truffle iframes
    const fromId = undefined;
    const context: Context<ReactNativeWebviewInterfaceContext> = {
      fromId,
    };
    
    // call the message handler set by the user
    this._messageHandler(JSON.parse(message.nativeEvent.data), replyFn, context);
  };

  public get isListening() {
    return this._isListening;
  }

  public listen() {
    this._options.addMessageListener(this._messageHandlerWrapper);
    this._isListening = true;
  }

  public close() {
    this._options.removeMessageListener(this._messageHandlerWrapper);
    this._isListening = false;
  }

  onMessage(callback: (message: unknown, reply: RPCReplyFunction, context: Context<ReactNativeWebviewInterfaceContext>) => void): void {
    this._messageHandler = callback;
  }

  registerFrame(_frame: never, _id: string): void {
    console.warn("Method not implemented.");
  }
}

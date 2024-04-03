import type { WebView, WebViewMessageEvent } from "react-native-webview";
import type { RefObject } from "react";

export interface WebToReactNativeWebviewConsumerInterfaceOptions {
  webviewRef: RefObject<WebView>;
  addMessageListener: (listener: (message: WebViewMessageEvent) => void) => void;
  removeMessageListener: (listener: (message: WebViewMessageEvent) => void) => void;
  /**
   * A whitelist of origins that are allowed to communicate with the provider
   */
  allowedOrigins?: string[];
}

export type WebToReactNativeWebviewInterfaceContext = {
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => unknown;
    };
  }
}
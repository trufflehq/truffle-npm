import { TransframeConsumer } from "../../transframe-consumer";
import { TransframeProvider } from "../../transframe-provider";
import type { TransframeConsumerOptions, TransframeProviderOptions, TransframeSourceApi } from "../../types";
import { WebToReactNativeWebviewConsumerInterface } from "./consumer";
import { WebToReactNativeWebviewProviderInterface } from "./provider";
import type { WebToReactNativeWebviewConsumerInterfaceOptions, WebToReactNativeWebviewInterfaceContext } from "./types";

export function createWebToReactNativeWebviewConsumer
<Api extends TransframeSourceApi<WebToReactNativeWebviewInterfaceContext>>
(
  options: WebToReactNativeWebviewConsumerInterfaceOptions & TransframeConsumerOptions<Api>
) {
  return new TransframeConsumer<Api>(
    new WebToReactNativeWebviewConsumerInterface(options),
    options
  );
}

export function createWebToReactNativeWebviewProvider
<Api extends TransframeSourceApi<WebToReactNativeWebviewInterfaceContext>>(
  options: TransframeProviderOptions<Api>
) {
  return new TransframeProvider<never, TransframeSourceApi<WebToReactNativeWebviewInterfaceContext>>(
    new WebToReactNativeWebviewProviderInterface(),
    options
  );
}

export function createWebToReactNativeWebviewApi
<Api extends TransframeSourceApi<WebToReactNativeWebviewInterfaceContext>>(api: Api) {
  return api;
}

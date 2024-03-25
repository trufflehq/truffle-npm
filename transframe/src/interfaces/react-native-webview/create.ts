import { TransframeConsumer } from "../../transframe-consumer";
import { TransframeProvider } from "../../transframe-provider";
import type { TransframeConsumerOptions, TransframeProviderOptions, TransframeSourceApi } from "../../types";
import { ReactNativeWebviewConsumerInterface } from "./consumer";
import { ReactNativeWebviewProviderInterface } from "./provider";
import type { ReactNativeWebviewProviderInterfaceOptions, ReactNativeWebviewInterfaceContext } from "./types";

export function createReactNativeWebviewConsumer
<Api extends TransframeSourceApi<ReactNativeWebviewInterfaceContext>>
(
  options?: TransframeConsumerOptions<Api>
) {
  return new TransframeConsumer<Api>(
    new ReactNativeWebviewConsumerInterface(),
    options
  );
}

export function createReactNativeWebviewProvider
<Api extends TransframeSourceApi<ReactNativeWebviewInterfaceContext>>(
  options: ReactNativeWebviewProviderInterfaceOptions & TransframeProviderOptions<Api>
) {
  return new TransframeProvider<never, TransframeSourceApi<ReactNativeWebviewInterfaceContext>>(
    new ReactNativeWebviewProviderInterface(options),
    options
  );
}

export function createReactNativeWebviewApi
<Api extends TransframeSourceApi<ReactNativeWebviewInterfaceContext>>(api: Api) {
  return api;
}

import { TransframeConsumer } from "../../transframe-consumer";
import { TransframeProvider } from "../../transframe-provider";
import type { TransframeConsumerOptions, TransframeProviderOptions, TransframeSourceApi } from "../../types";
import { ReactNativeWebviewToWebConsumerInterface } from "./consumer";
import { ReactNativeWebviewToWebProviderInterface } from "./provider";
import type { ReactNativeWebviewToWebProviderInterfaceOptions, ReactNativeWebviewToWebInterfaceContext } from "./types";

export function createReactNativeWebviewToWebConsumer
<Api extends TransframeSourceApi<ReactNativeWebviewToWebInterfaceContext>>
(
  options?: TransframeConsumerOptions<Api>
) {
  return new TransframeConsumer<Api>(
    new ReactNativeWebviewToWebConsumerInterface(),
    options
  );
}

export function createReactNativeWebviewToWebProvider
<Api extends TransframeSourceApi<ReactNativeWebviewToWebInterfaceContext>>(
  options: ReactNativeWebviewToWebProviderInterfaceOptions & TransframeProviderOptions<Api>
) {
  return new TransframeProvider<never, TransframeSourceApi<ReactNativeWebviewToWebInterfaceContext>>(
    new ReactNativeWebviewToWebProviderInterface(options),
    options
  );
}

export function createReactNativeWebviewToWebApi
<Api extends TransframeSourceApi<ReactNativeWebviewToWebInterfaceContext>>(api: Api) {
  return api;
}

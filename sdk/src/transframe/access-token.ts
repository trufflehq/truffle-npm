import { getEmbedConsumer } from './orchestrator-to-anyweb-unprivileged-consumer';

export async function getAccessToken(onChange?: (accessToken: string) => void): Promise<string> {
  const accessToken = getEmbedConsumer().call('userGetAccessToken', onChange)
    .then((accessToken) => accessToken as string)
    .catch(() => {
      console.error('Failed to get access token, is the embed in a Truffle frame?');
      return '';
    });
  return accessToken;
}

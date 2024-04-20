import { getEmbedConsumer } from './orchestrator-to-anyweb-unprivileged-consumer';

export async function getAccessToken(onChange?: (accessToken: string) => void): Promise<string> {
  const accessToken = (await getEmbedConsumer().call('userGetAccessToken', onChange)) as string;
  return accessToken;
}

import { getEmbedConsumer } from './embed-consumer';

export async function getAccessToken(onChange?: (accessToken: string) => void): Promise<string> {
  const accessToken = (await getEmbedConsumer().call('userGetAccessToken')) as string;
  if (onChange) getEmbedConsumer().call('userOnAccessTokenChange', onChange);
  return accessToken;
}

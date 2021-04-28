import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getPublicAccount } from '../../api/accounts';
import { normalizeQuery } from '../../api/utils/router';

function usePublicAccount() {
  const router = useRouter();
  const { subpage, summonerName, platformId } = normalizeQuery(router.query);
  const { data: publicAccount } = useQuery(
    ['publicAccount', summonerName, platformId],
    () => getPublicAccount({ summonerName, platformId }),
    {
      enabled: Boolean(summonerName && platformId),
    }
  );

  return {
    showPublicAccount: subpage === 'profile',
    publicAccount,
  };
}

export default usePublicAccount;

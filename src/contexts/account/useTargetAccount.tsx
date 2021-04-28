import { Account } from '../../api/accounts';
import useAccount from './useAccount';
import usePublicAccount from './usePublicAccount';

function useTargetAccount(): Account {
  const { account } = useAccount();
  const { showPublicAccount, publicAccount } = usePublicAccount();
  return showPublicAccount ? publicAccount : account;
}

export default useTargetAccount;

// useAuth.js
import { useUserContext } from './UserContext';

export function useAuth() {
  const { authenticated } = useUserContext();
  return authenticated;
}

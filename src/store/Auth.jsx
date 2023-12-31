import { createContext, useCallback, useEffect, useState } from 'react';
import { SafeAuthPack } from '@safe-global/auth-kit';

const authContext = createContext({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  token: null,
  user: null,
  data: null,
  setData: () => {},
});

export { authContext };

const AuthContextProvider = props => {
  const tempToken = localStorage.getItem('token');
  const tempUser = localStorage.getItem('user');

  const [isAuthenticated, setIsAuthenticated] = useState(
    tempToken && tempUser ? true : false
  );
  const [token, setToken] = useState(tempToken ? tempToken : null);
  const [user, setUser] = useState(tempUser ? JSON.parse(tempUser) : null);
  const [data, setData] = useState(null);
  const [safeAuthPack, setSafeAuthPack] = useState(null);
  const getData = useCallback(async () => {
    const data = await fetch('http://localhost:5000/data', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const res = await data?.json();

    setData(res[0]);
  }, []);
  useEffect(() => {
    getData();
  }, []);
  const login = async () => {
    const safeAuthInitOptions = {
      enableLogging: true,
      showWidgetButton: false,
      chainConfig: {
        chainId: import.meta.env.VITE_APP_CHAINID,
        rpcTarget: `${import.meta.env.VITE_APP_RPC}`,
      },
    };

    const safeAuthPack = new SafeAuthPack({});
    await safeAuthPack.init(safeAuthInitOptions);
    setSafeAuthPack(safeAuthPack);
    console.log('init done');
    const authKitSignData = await safeAuthPack.signIn({
      loginProvider: 'google' | 'twitter' | '',
    });
    if (authKitSignData?.eoa) {
      localStorage.setItem('token', authKitSignData.eoa);
      setToken(authKitSignData.eoa);
    }
    const userData = await safeAuthPack.getUserInfo();
    console.log(userData);
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    safeAuthPack.signOut();
  };

  return (
    <authContext.Provider
      value={{
        data,
        setData,
        isAuthenticated,
        token,
        user,
        safeAuthPack,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

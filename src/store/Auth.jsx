import { createContext, useState } from 'react';
import { SafeAuthPack } from '@safe-global/auth-kit';

const authContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: null,
  user: null,
});

export { authContext };

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [safeAuthPack, setSafeAuthPack] = useState(null);

  const login = async () => {
    const safeAuthInitOptions = {
      enableLogging: true,
      showWidgetButton: false,
      chainConfig: {
        chainId: '0x1',
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
  };

  const logout = () => {
    safeAuthPack.signOut();
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        token,
        user,

        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

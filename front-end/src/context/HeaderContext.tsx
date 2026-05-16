import { createContext, useContext, useState } from "react";

interface HeaderContextType {
  refreshKey: number;
  refresh: () => void;
}

const HeaderContext = createContext<HeaderContextType>({
  refreshKey: 0,
  refresh: () => {},
});

function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((n) => n + 1);

  return (
    <HeaderContext.Provider value={{ refreshKey, refresh }}>
      {children}
    </HeaderContext.Provider>
  );
}

export { HeaderProvider };
export const useHeaderRefresh = () => useContext(HeaderContext);

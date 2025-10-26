import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useColorModeStore                     = create(
  persist(
    ( set ) => ({
      colorMode                             : localStorage.getItem( 'colorMode' ) || 'light',
      setColorMode                          : ( colorMode ) => set({ colorMode }),
    }),
    {
      name                                  : 'color-mode',
      getStorage                            : () => localStorage,
    }
  )
)

export default useColorModeStore

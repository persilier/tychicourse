import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Logo = {
  url: string
  darkUrl?: string
}

export type Background = {
  id: string
  url: string
  blur: number
  opacity: number
  isEnabled: boolean
  overlay?: boolean
}

type BrandingSettings = {
  name: string
  slogan: string
  logo: Logo | null
}

type AuthState = {
  backgrounds: Background[]
  currentBackgroundId: string | null
  currentBackgroundIndex: number
  branding: BrandingSettings
}

type AuthActions = {
  addBackground: (background: Background) => void
  removeBackground: (id: string) => void
  setCurrentBackground: (id: string | null) => void
  setCurrentBackgroundIndex: (index: number) => void
  updateBackground: (id: string, updates: Partial<Background>) => void
  getCurrentBackground: () => Background | undefined
  toggleBackground: (id: string) => void
  updateBranding: (updates: Partial<BrandingSettings>) => void
}

const initialState: AuthState = {
  backgrounds: [
    {
      id: "default",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      blur: 0,
      opacity: 0.5,
      isEnabled: true,
      overlay: true
    },
  ],
  currentBackgroundId: "default",
  currentBackgroundIndex: 0,
  branding: {
    name: "Tychi Course",
    slogan: "Your learning platform",
    logo: null
  }
}

const useAuthSettingsStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      addBackground: (background) =>
        set((state) => ({
          backgrounds: [...state.backgrounds, background],
        })),
      removeBackground: (id) =>
        set((state) => ({
          backgrounds: state.backgrounds.filter((bg) => bg.id !== id),
          currentBackgroundId:
            state.currentBackgroundId === id ? null : state.currentBackgroundId,
        })),
      setCurrentBackground: (id) =>
        set((state) => ({
          currentBackgroundId: id,
          currentBackgroundIndex: state.backgrounds.findIndex(bg => bg.id === id)
        })),
      setCurrentBackgroundIndex: (index) =>
        set((state) => ({
          currentBackgroundIndex: index,
          currentBackgroundId: state.backgrounds[index]?.id || null
        })),
      updateBackground: (id, updates) =>
        set((state) => ({
          backgrounds: state.backgrounds.map((bg) =>
            bg.id === id ? { ...bg, ...updates } : bg
          ),
        })),
      toggleBackground: (id) =>
        set((state) => ({
          backgrounds: state.backgrounds.map((bg) =>
            bg.id === id ? { ...bg, isEnabled: !bg.isEnabled } : bg
          ),
        })),
      getCurrentBackground: () => {
        const state = get()
        return state.backgrounds.find((bg) => bg.id === state.currentBackgroundId)
      },
      updateBranding: (updates) =>
        set((state) => ({
          branding: { ...state.branding, ...updates },
        })),
    }),
    {
      name: "auth-settings",
    }
  )
)

// Sélecteurs mémorisés
const selectState = (state: AuthState & AuthActions) => ({
  backgrounds: state.backgrounds,
  currentBackgroundId: state.currentBackgroundId,
  currentBackgroundIndex: state.currentBackgroundIndex,
  branding: state.branding,
})

const selectActions = (state: AuthState & AuthActions) => ({
  addBackground: state.addBackground,
  removeBackground: state.removeBackground,
  setCurrentBackground: state.setCurrentBackground,
  setCurrentBackgroundIndex: state.setCurrentBackgroundIndex,
  updateBackground: state.updateBackground,
  toggleBackground: state.toggleBackground,
  updateBranding: state.updateBranding,
})

const selectBranding = (state: AuthState & AuthActions) => state.branding

const selectCurrentBackground = (state: AuthState & AuthActions) =>
  state.backgrounds.find(bg => bg.id === state.currentBackgroundId)

// Hooks personnalisés pour accéder au store
export const useAuthState = () => useAuthSettingsStore(selectState)
export const useAuthActions = () => useAuthSettingsStore(selectActions)
export const useAuthBranding = () => useAuthSettingsStore(selectBranding)
export const useCurrentBackground = () => useAuthSettingsStore(selectCurrentBackground)

export type { Background as AuthBackground }

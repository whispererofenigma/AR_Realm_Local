import { moderateScale } from '@/Constants/PixelRatio';

export const Colors = {
  bg: {
    base: '#0A0A0A',
    surface: '#171717',
    elevated: '#262626',
  },
  accent: {
    primary: '#6366F1', // Indigo - good for a modern tech feel
    secondary: '#A855F7',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A3A3A3',
    inverse: '#0A0A0A',
  },
  // CRITICAL FOR AR: Overlays for UI sitting on top of the camera
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.6)',
    heavy: 'rgba(0, 0, 0, 0.8)',
    blur: 'rgba(23, 23, 23, 0.75)', // Useful with blurred views
  },
  border: {
    default: '#404040',
    focus: '#6366F1',
  },
  transparent: 'transparent',
  white: '#FFFFFF',
};

export const arRealmTheme = {
  dark: {
    primary: Colors.accent.primary,
    secondary: Colors.accent.secondary,
    textPrimary: Colors.text.primary,
    textSecondary: Colors.text.secondary,
    background: Colors.bg.base,
    cardBackground: Colors.bg.surface,
    overlayMedium: Colors.overlay.medium,
    // ... basic-elements mappings
    primaryThemeColor: Colors.bg.base,
    secondaryThemeColor: Colors.bg.surface,
    primaryFontColor: Colors.text.primary,
    secondaryFontColor: Colors.text.secondary,
  }
};

export default { Colors, arRealmTheme };
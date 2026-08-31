import { definePreset } from '@primeuix/themes';

import Aura from '@primeuix/themes/aura';

export const defaultPreset = definePreset(Aura, {
  semantic: {
    formField: {
      paddingX: '0',
    },

    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },

    colorScheme: {
      light: {
        primary: {
          color: '{blue.600}',
          hoverColor: '{blue.700}',
          activeColor: '{blue.800}',
        },
      },

      dark: {
        primary: {
          color: '{indigo.600}',
          hoverColor: '{indigo.700}',
          activeColor: '{indigo.800}',
        },
      },
    },
  },
  components: {
    floatlabel: {
      root: {
        positionX: '0',
      },
    },
  },
});

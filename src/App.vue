<template>
  <van-config-provider
    :theme="appStore.theme"
    theme-vars-scope="global"
    :theme-vars-light="state.themeLight"
    :theme-vars-dark="state.themeDark"
  >
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import type { ConfigProviderTheme, ConfigProviderThemeVars } from 'vant'
import { useAppStore } from '@/store/useAppStore'

interface StateType {
  theme: ConfigProviderTheme
  themeLight: ConfigProviderThemeVars
  themeDark: ConfigProviderThemeVars
}
const appStore = useAppStore()
const state = reactive<StateType>({
  theme: 'light',
  themeLight: {
    black: '#000',
    white: '#fff',
    gray1: '#f7f8fa',
    gray2: '#f2f3f5',
    gray3: '#ebedf0',
    gray4: '#dcdee0',
    gray5: '#c8c9cc',
    gray6: '#969799',
    gray7: '#646566',
    gray8: '#323233',
    red: '#ee0a24',
    blue: '#1989fa',
    orange: '#ff976a',
    orangeDark: '#ed6a0c',
    orangeLight: '#fffbe8',
    green: '#07c160',
    gradientRed: 'linear-gradient(to right, #ff6034, #ee0a24)',
    gradientOrange: 'linear-gradient(to right, #ffd01e, #ff8917)',
    activeOpacity: 0.6,
    disabledOpacity: 0.5,
    paddingBase: '4px',
    paddingXs: '8px',
    paddingSm: '12px',
    paddingMd: '16px',
    paddingLg: '24px',
    paddingXl: '32px',
    fontSizeXs: '10px',
    fontSizeSm: '12px',
    fontSizeMd: '14px',
    fontSizeLg: '16px',
    fontBold: 600,
    lineHeightXs: '14px',
    lineHeightSm: '18px',
    lineHeightMd: '20px',
    lineHeightLg: '22px',
    baseFont:
      "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif",
    priceFont: 'Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif',
    durationBase: '0.3s',
    durationFast: '0.2s',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    borderWidth: '1px',
    radiusSm: '2px',
    radiusMd: '4px',
    radiusLg: '8px',
    radiusMax: '999px'
  },
  themeDark: {
    black: '#fff',
    white: '#181818',
    gray1: '#232324',
    gray2: '#222226',
    gray3: '#2c2c2e',
    gray4: '#39393b',
    gray5: '#4a4a4a',
    gray6: '#6b6b6b',
    gray7: '#8e8e93',
    gray8: '#c7c7cc',
    red: '#ff4d4f',
    blue: '#409eff',
    orange: '#ffb86c',
    orangeDark: '#ff8800',
    orangeLight: '#2c2c2e',
    green: '#4cd964',
    gradientRed: 'linear-gradient(to right, #ff7a7a, #ff4d4f)',
    gradientOrange: 'linear-gradient(to right, #ffd01e, #ffb86c)',
    activeOpacity: 0.7,
    disabledOpacity: 0.4,
    paddingBase: '4px',
    paddingXs: '8px',
    paddingSm: '12px',
    paddingMd: '16px',
    paddingLg: '24px',
    paddingXl: '32px',
    fontSizeXs: '10px',
    fontSizeSm: '12px',
    fontSizeMd: '14px',
    fontSizeLg: '16px',
    fontBold: 600,
    lineHeightXs: '14px',
    lineHeightSm: '18px',
    lineHeightMd: '20px',
    lineHeightLg: '22px',
    baseFont:
      "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif",
    priceFont: 'Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif',
    durationBase: '0.3s',
    durationFast: '0.2s',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    borderWidth: '1px',
    radiusSm: '2px',
    radiusMd: '4px',
    radiusLg: '8px',
    radiusMax: '999px'
  }
})
</script>

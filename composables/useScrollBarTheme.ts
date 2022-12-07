import { useThemeStore } from '~~/store'
import { useWatchWithMounted } from './useWatchWithMounted'

export const useScrollBarTheme = () => {
  const CUZ = '__cuzknothz'
  const themeStore = useThemeStore()

  const styleCss = computed(() => {
    return `
::-webkit-scrollbar-track {
  background: #121212;
}`
  })

  const checkIsCurrentHasStyle = (headTag: HTMLHeadElement) => {
    let result: boolean = false
    headTag.childNodes.forEach(({ localName, attributes }: any) => {
      if (localName === 'style' && attributes[0]?.name === CUZ) {
        return (result = true)
      }
      result = false
    })
    return result
  }

  const makeStyle = () => {
    const headTag = document.getElementsByTagName('head')[0]

    if (themeStore.darkMode) {
      let el = document.createElement('style')
      el.setAttribute(CUZ, CUZ)
      el.appendChild(document.createTextNode(styleCss.value))
      headTag.appendChild(el)
    } else {
      if (checkIsCurrentHasStyle(headTag)) {
        headTag.childNodes.forEach((i: any) => {
          const { localName, attributes } = i
          if (localName === 'style' && attributes[0]?.name === CUZ) {
            return headTag.removeChild(i)
          }
        })
      }
    }
  }

  useWatchWithMounted(() => themeStore.darkMode, makeStyle)
}

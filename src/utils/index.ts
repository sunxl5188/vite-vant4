import ClipboardJS from 'clipboard'

/**
 * @复制文本
 * @param el 触发复制的元素class或id
 * @官方地址 https://clipboardjs.uihtm.com/
 */
export function copyContent(el: string) {
  let a
  const clipboard = new ClipboardJS(el)
  clipboard.on('success', function (e) {
    console.info('Action:', e.action)
    console.info('Text:', e.text)
    console.info('Trigger:', e.trigger)
    e.clearSelection()
  })

  clipboard.on('error', function (e) {
    console.error('Action:', e.action)
    console.error('Trigger:', e.trigger)
  })
}

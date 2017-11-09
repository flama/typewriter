import MarkInlineShortcut from '../helpers/mark-inline-shortcut'

export default options => {

  const { onKeyDown } = MarkInlineShortcut({
    type: 'bold',
    regex: /\*{2}([^\*]+)\*{2}/g,
  })

  return {
    onKeyDown
  }
}

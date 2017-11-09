import MarkInlineShortcut from '../helpers/mark-inline-shortcut'

export default options => {

  const { onKeyDown } = MarkInlineShortcut({
    type: 'strikethrough',
    regex: /~([^~]+)~/g,
  })

  return {
    onKeyDown
  }
}

import MarkInlineShortcut from '../helpers/mark-inline-shortcut'

export default options => {

  const { onKeyDown } = MarkInlineShortcut({
    type: 'italic',
    regex: /_([^_]+)_/g,
  })

  return {
    onKeyDown
  }
}

import keycode from 'keycode'

export default options => {
  // Change the options to take a `key`.
  const { type, key, isAltKey = false } = options

  return {
    onKeyDown(event, data, change) {
      // Change the comparison to use the key name.
      if (!event.metaKey || keycode(event.which) != key || event.altKey != isAltKey) return

      event.preventDefault()
      return change.toggleMark(type)
    }
  }
}

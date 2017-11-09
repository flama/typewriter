export default (options = {}) => {
  const { regex, type } = options

  return {
    onKeyDown(event, data, change) {
      const { startBlock } = change.state
      const chars = startBlock.text
      const match = regex.exec(chars)

      if(!match) return

      const start = match.index
      const end = start + match[1].length
      const markdownToken = match[0].slice(0, match[0].indexOf(match[1]))

      event.preventDefault()
      return change
        .moveOffsetsTo(start, start + markdownToken.length)
        .delete()
        .moveOffsetsTo(end, end + markdownToken.length)
        .delete()
        .moveOffsetsTo(start, end)
        .toggleMark(type)
        .moveOffsetsTo(end, end)
    }
  }
}

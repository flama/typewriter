import getVideoId from 'get-video-id'

export default (url) => {
  const video = getVideoId(url)

  if (typeof video === 'undefined') return false

  switch (video.service) {
    case 'youtube':
      return `https://youtube.com/embed/${video.id}`
    case 'vimeo':
      return `https://player.vimeo.com/video/${video.id}`
    default:
      return false
  }
}

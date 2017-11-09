Typewriter.config_images(
  access_key_id:ENV['AWS_KEY_ID'],
  secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  region: "sa-east-1",
  bucket: "nanofile-temp-uploads",
  breakpoints: {
    small: 640,
    medium: 1024,
    large: 1440,
    huge: 1920
  },
  sizes: {
    small: 512 * 2,
    medium: 730 * 2,
    large: 780 * 2,
  }
)

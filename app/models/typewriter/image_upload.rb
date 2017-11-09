module Typewriter
  class ImageUpload < ApplicationRecord
    has_image :image, sizes: Typewriter.image_sizes
  end
end

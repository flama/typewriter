require "typewriter/engine"

module Typewriter
  class << self
    attr_reader :image_sizes
  end

  def self.config_images(config = {})
    @image_sizes = config.delete(:sizes) || {}
    Nanofile.config(config)
  end
end

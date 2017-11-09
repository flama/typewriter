class Article < ApplicationRecord
  has_editable :title, :body

  # TODO: Implement breakpoints for image
  # has_editable :title, body: {
  #   image: { small: 500, medium: 800 }
  # }
end

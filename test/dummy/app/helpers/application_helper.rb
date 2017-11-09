module ApplicationHelper
  def ensure_default(title)
    return title if title.present?

    'Untitled'
  end
end

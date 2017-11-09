module SpawnerHelper
  def component_for(name, attributes = {}, html = { class: 'component' })
    data = stringify_active_models(attributes)
      .merge(component: name, authenticity_token: form_authenticity_token)

    tag.div({data: data}.merge(html)) do
      yield if block_given?
    end
  end

  def typewriter_for(name, attributes = {}, html = { class: 'component' })
    attributes = attributes.merge({
      presign_from: typewriter_nanofile.presign_path,
      upload_to: typewriter.image_uploads_path
    })

    component_for(name, attributes, html)
  end

  private

  def stringify_active_models(attributes)
    attributes.map do |key, value|
      value = value.try(:as_json) || value
      [key, value]
    end.to_h
  end
end

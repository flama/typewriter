# This migration comes from typewriter (originally 20171106224609)
class CreateTypewriterImageUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :typewriter_image_uploads do |t|
      t.text :image_data

      t.timestamps
    end
  end
end

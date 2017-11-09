# test/dummy# bin/rails typewriter:install:migrations
class CreateTypewriterImageUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :typewriter_image_uploads do |t|
      t.text :image_data

      t.timestamps
    end
  end
end

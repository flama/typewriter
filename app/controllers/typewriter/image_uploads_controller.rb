class Typewriter::ImageUploadsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    render json: Typewriter::ImageUpload.create!(image_params).to_json
  end

  def show
    upload = Typewriter::ImageUpload.find(params[:id])

    render json: {
      src: upload.image_src,
      srcset: upload.image_srcset
    }
  end

  private

  def image_params
    params.permit(:image)
  end
end

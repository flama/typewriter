Typewriter::Engine.routes.draw do
  resources :image_uploads
  mount Nanofile::Engine => '/nanofile', as: :typewriter_nanofile
end

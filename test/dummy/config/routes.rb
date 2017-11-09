Rails.application.routes.draw do
  resources :articles
  mount Typewriter::Engine => '/typewriter'
end

Rails.application.routes.draw do
  resources :posts
  resources :users
  resources :comments
  scope :format => true, :constraints => { :format => 'json' } do
    post   "/login"       => "sessions#create"
    delete "/logout"      => "sessions#destroy"
  end
end

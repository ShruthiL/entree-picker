Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # namespace :user do
  #   root :to => "homes#authenticate"
  # end

  get '/switch_theme', to: "homes#switch_theme"
  get '/entree_picker', to: "homes#authenticate"
  get '/picked_entree', to: "homes#authenticate"
  get '/entree_history', to: "homes#authenticate"
  get '/your_experience', to: "homes#authenticate"

  namespace :api do
    namespace :v1 do
      resources :change_themes, only: [:index, :create]
      resources :picked_entrees, only: [:index, :create, :update, :destroy]
      resources :reviews, only: [:edit, :create, :update, :destroy]
      resources :site_reviews, only: [:index, :create, :update, :destroy]
    end
  end
end

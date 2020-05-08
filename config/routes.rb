Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # namespace :user do
  #   root :to => "homes#authenticate"
  # end

  get '/entree_picker', to: "homes#authenticate"
  get '/popular_entree', to: "homes#authenticate"
  get '/entree_history', to: "homes#authenticate"

  namespace :api do
    namespace :v1 do
      resources :menu_items, only: [:index, :create]
      resources :reviews, only: [:update, :destroy]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

class Api::V1::MenuItemsController < ApplicationController
  before_action :authenticate_user!, except:[:index]
  protect_from_forgery unless: -> { request.format.json? }
  # def index
  #   # render json: MenuItem.all
  #   render json: PickedEntree.where(saved: true, user: current_user)
  # end

  def create
    if params["prevPopularEntree"]["id"] != nil
      menu_item_id = params["prevPopularEntree"]["id"]
      PickedEntree.find_by_menu_item_id(menu_item_id).update(saved: false)
    end
    nearby_restaurants = []

    if params["location"] != nil
      if params["location"]["lat"] != nil && params["location"]["lon"] != nil
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
      end
      selected_menu_option = SelectedMenuOption.create(lat: params["location"]["lat"] , lon: params["location"]["lon"], user: current_user)

      result = Faraday.get do |req|
          req.url url
          req.params['location']  = "#{params["location"]["lat"]},#{params["location"]["lon"]}"
          req.params['radius']  = "5000"
          req.params['types']  = "restaurant"
          req.params['key']  = "AIzaSyCRrWfWSdjkChUXasx3gJIYuK7oKBkMQkg"
      end

      nearby_restaurants = JSON.parse(result.body)["results"]
    end

    if params["selectedOptions"] != nil
      url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

      selected_menu_option = SelectedMenuOption.create(
        zip_code: params["selectedOptions"]["zipcode"].to_i,
        radius: params["selectedOptions"]["radius"],
        rating: params["selectedOptions"]["rating"],
        cuisine: params["selectedOptions"]["cuisine"],
        price: params["selectedOptions"]["price"],
        category: params["selectedOptions"]["category"],
        user: current_user)

      result = Faraday.get do |req|
          req.url url
          req.params['radius']  = params["selectedOptions"]["radius"]
          req.params['types']  = "restaurant"
          req.params['key']  = "AIzaSyCRrWfWSdjkChUXasx3gJIYuK7oKBkMQkg"
          req.params['query']  = "#{params["selectedOptions"]["zipcode"]},#{params["selectedOptions"]["cuisine"]}"
      end

      nearby_restaurants = JSON.parse(result.body)["results"]
    end

    nearby_restaurants_ids = []
    nearby_restaurants.each do |restaurant|
      nearby_restaurants_ids << restaurant["place_id"]
    end

    most_rated_entree = {}
    most_rated_entree_rating = 0
    restaurant_with_most_rated_entree = {}
    picked_entrees_id = []
    PickedEntree.all.each do |picked_entree|
      picked_entrees_id << picked_entree.menu_item_id
    end

    nearby_restaurants_ids.each do |restaurant|
      current_restaurant = Restaurant.find_by_restaurant_id(restaurant)

      if current_restaurant != nil && current_restaurant.menu_items.size > 0
        current_restaurant.menu_items.each do |menu_item|
          if !picked_entrees_id.include?(menu_item.id)
            if menu_item.reviews.size > 0
              if most_rated_entree_rating < menu_item.reviews.order(rating: :desc).limit(1)[0].rating
                most_rated_entree = menu_item
                most_rated_entree_rating = menu_item.reviews.order(rating: :desc).limit(1)[0].rating
                restaurant_with_most_rated_entree = current_restaurant
              end
            end
          end
        end
      end
    end

    
    if most_rated_entree != {}
      picked_entree = PickedEntree.new(selected_menu_option: selected_menu_option, menu_item: most_rated_entree, user: current_user )
      if picked_entree.save
        render json: most_rated_entree
      else
        render json: { errors: picked_entree.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    else
      # flash[:error].now = "No entree found"
      render json: {errors: "No entree found", status: :unprocessable_entity}
    end
  end

    private

    def selected_options_params
      params.require(:location).permit(:lat, :lon)
    end
end

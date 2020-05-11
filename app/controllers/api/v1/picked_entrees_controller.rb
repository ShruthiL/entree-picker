class Api::V1::PickedEntreesController < ApplicationController
  before_action :authenticate_user!, except:[:index]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    # render json: MenuItem.all
    render json: PickedEntree.where(saved: true, user: current_user).order("created_at DESC")
  end

  # def create
  #   if params["prevPopularEntree"]["id"] != nil
  #     menu_item_id = params["prevPopularEntree"]["id"]
  #     PickedEntree.find_by_menu_item_id(menu_item_id).update(saved: false)
  #   end
  #
  #   if params["location"]["lat"] != nil && params["location"]["lon"] != nil
  #     url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{params["location"]["lat"]},#{params["location"]["lon"]}&radius=5000&types=restaurant&key=AIzaSyCRrWfWSdjkChUXasx3gJIYuK7oKBkMQkg"
  #   end
  #   selected_menu_option = SelectedMenuOption.create(lat: params["lat"] , lon: params["lon"], user: current_user)
  #
  #
  #   result = Faraday.get(url)
  #   nearby_restaurants = JSON.parse(result.body)["results"]
  #   # nearby_restaurants.each do |res|
  #   #   Restaurant.create(restaurant_id: res["place_id"], name: res["name"], lat: res["geometry"]["location"]["lat"], lon: res["geometry"]["location"]["lng"])
  #   # end
  #   nearby_restaurants_ids = []
  #   nearby_restaurants.each do |restaurant|
  #     nearby_restaurants_ids << restaurant["place_id"]
  #   end
  #
  #   most_rated_entree = ""
  #   most_rated_entree_rating = 0
  #   restaurant_with_most_rated_entree = ""
  #   picked_entrees_id = []
  #   PickedEntree.all.each do |picked_entree|
  #     picked_entrees_id << picked_entree.menu_item_id
  #   end
  #
  #   nearby_restaurants_ids.each do |restaurant|
  #     current_restaurant = Restaurant.find_by_restaurant_id(restaurant)
  #
  #     if current_restaurant != nil && current_restaurant.menu_items.size > 0
  #       current_restaurant.menu_items.each do |menu_item|
  #         if !picked_entrees_id.include?(menu_item.id)
  #           if menu_item.reviews.size > 0
  #             if most_rated_entree_rating < menu_item.reviews.order(rating: :desc).limit(1)[0].rating
  #               most_rated_entree = menu_item
  #               most_rated_entree_rating = menu_item.reviews.order(rating: :desc).limit(1)[0].rating
  #               restaurant_with_most_rated_entree = current_restaurant
  #             end
  #           end
  #         end
  #       end
  #     end
  #   end
  #   picked_entree = PickedEntree.create(selected_menu_option: selected_menu_option, menu_item: most_rated_entree, user: current_user )
  #   render json: most_rated_entree
  # end
#

  def update
    updated_picked_entree = PickedEntree.find(params[:id])

    if updated_picked_entree.update(visited: picked_entree_params["visited"])
      render json: updated_picked_entree
    else
      render json: { errors: updated_picked_entree.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def destroy
    deleted_picked_entree = PickedEntree.find(params[:id]).delete
    render json: deleted_picked_entree
  end

  private

  def picked_entree_params
    params.require(:entree).permit(:entree, :visited)
  end
end

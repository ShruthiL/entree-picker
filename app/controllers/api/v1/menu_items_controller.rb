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
    menu_items = []
    @number_of_pages = 0
    @number_of_menu_items_pages = 0
    @random_restaurant = {}
    @selected_menu_option = {}

    if params["location"] != nil
      @random_restaurant = get_random_restaurant_by_location
    end

    if params["selectedOptions"] != nil
      @random_restaurant = get_random_restaurant_by_options
    end

    new_restaurant = add_restaurant(@random_restaurant)
    if new_restaurant != nil
      new_menu_item = add_menu_item(new_restaurant)
      add_picked_entree(@selected_menu_option, new_menu_item)
    end

  end

    private

    def get_restaurants(url, page_num)
      result = Faraday.get do |req|
          req.url url
          req.params['page'] = page_num
          req.headers['x-rapidapi-host'] = 'us-restaurant-menus.p.rapidapi.com'
          req.headers['x-rapidapi-key'] = '8516b3044dmsh713902e2f1f62f6p169e6cjsn1a261092df5d'
      end
      @number_of_pages = 3
      nearby_restaurants = JSON.parse(result.body)["result"]

      restaurants_details = []
      nearby_restaurants["data"].each do |res|
        restaurants_details << {
          restaurant_id: res["restaurant_id"],
          name: res["restaurant_name"],
          cuisines: res["cuisines"],
          price_range: res["price_range_100"],
          lat: res["geo"]["lat"],
          lon: res["geo"]["lon"],
          address: res["address"]["formatted"]
        }
      end
      restaurants_details
    end

    def get_menu_items(url, restaurant_id, page_num)
      result = Faraday.get do |req|
          req.url url
          req.params['page'] = page_num
          req.params['fields'] =  "{\"restaurant_id\":#{restaurant_id}}"
          req.headers['x-rapidapi-host'] = 'us-restaurant-menus.p.rapidapi.com'
          req.headers['x-rapidapi-key'] = '8516b3044dmsh713902e2f1f62f6p169e6cjsn1a261092df5d'
      end


      @number_of_menu_items_pages = JSON.parse(result.body)["result"]["pages"]
      menu_items_results = JSON.parse(result.body)["result"]
      menu_items = []
      menu_items_results["data"].each do |res|
        menu_items << {
          restaurant_id: res["restaurant_id"],
          menu_item_id: res["item_id"],
          name: res["menu_item_name"]
        }
      end
      menu_items
    end

    def add_restaurant(restaurant)
      new_restaurant = Restaurant.find_by_restaurant_id(restaurant[:restaurant_id])
      if new_restaurant == nil
        new_restaurant = Restaurant.create(
          restaurant_id: restaurant[:restaurant_id].to_s,
          name: restaurant[:name],
          cuisine: restaurant[:cuisines].size > 0 ? restaurant[:cuisines][0] : '',
          lat: restaurant[:lat],
          lon: restaurant[:lon],
          price_range: restaurant[:price_range],
          address: restaurant[:address]
        )
      end
      new_restaurant
    end

    def add_menu_item(restaurant)

      menu_items_url = "https://us-restaurant-menus.p.rapidapi.com/menuitems/search/fields"
      menu_items = get_menu_items(menu_items_url, restaurant[:restaurant_id], 1)

      if @number_of_menu_items_pages > 1
        (2..@number_of_menu_items_pages).each do |index|
          menu_items.concat(get_menu_items(menu_items_url, restaurant[:restaurant_id], index))
        end
      end

      picked_entrees = PickedEntree.all
      filtered_menu_items= []
# 103468458
      menu_items.each do |menu_item|
        menu_item_details = MenuItem.find_by_menu_item_id(menu_item[:menu_item_id])

        if menu_item_details != nil
          if picked_entrees.select{ |item| item[:menu_item_id] == menu_item_details[:id] && item[:saved] }.length == 0
            filtered_menu_items << menu_item
          end
        else
          filtered_menu_items << menu_item
        end
      end

      random_menu_item = filtered_menu_items.sample;
      new_menu_item = MenuItem.find_by_menu_item_id(random_menu_item[:menu_item_id])
      if new_menu_item == nil
        new_menu_item = MenuItem.create(
          restaurant_id: restaurant[:id],
          menu_item_id: random_menu_item[:menu_item_id],
          name: random_menu_item[:name],
          price: 0
        )
      end
      new_menu_item
    end

    def add_picked_entree(selected_menu_option, new_menu_item)
      if new_menu_item != {}
        picked_entree = PickedEntree.new(selected_menu_option: selected_menu_option, menu_item: new_menu_item, user: current_user )

        if picked_entree.save
          render json: new_menu_item
        else
          render json: { errors: picked_entree.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      else

        render json: {errors: "No entree found", status: :unprocessable_entity}
      end
    end

    def get_random_restaurant_by_location
      results = Geocoder.search([params["location"]["lat"] , params["location"]["lon"]])
      zip_code = results.first.postal_code[0..4]

      restaurants_url = "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/#{zip_code}"

      @selected_menu_option = SelectedMenuOption.create(lat: params["location"]["lat"] , lon: params["location"]["lon"], user: current_user)

      all_restaurants_details = get_restaurants(restaurants_url, 1)

      if @number_of_pages > 1
        (2..@number_of_pages).each do |index|
          all_restaurants_details.concat(get_restaurants(restaurants_url, index))
        end
      end

      random_restaurant = all_restaurants_details.sample
    end

    def get_random_restaurant_by_options
      restaurants_url = "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/#{params["selectedOptions"]["zipcode"]}"

      @selected_menu_option = SelectedMenuOption.create(
        zip_code: params["selectedOptions"]["zipcode"].to_i,
        radius: params["selectedOptions"]["radius"],
        rating: params["selectedOptions"]["rating"],
        cuisine: params["selectedOptions"]["cuisine"],
        price: params["selectedOptions"]["price"],
        category: params["selectedOptions"]["category"],
        user: current_user)

      all_restaurants_details = get_restaurants(restaurants_url, 1)
      if @number_of_pages > 1
        (2..@number_of_pages).each do |index|
          all_restaurants_details.concat(get_restaurants(restaurants_url, index))
        end
      end

      res_with_required_params = []

      all_restaurants_details.each do |res|
        if res[:price_range] == params["selectedOptions"]["price"].to_i
          res_with_required_params << res
        end
      end

      random_restaurant = res_with_required_params.sample
    end

    def selected_options_params
      params.require(:location).permit(:lat, :lon)
    end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Restaurant.create(restaurant_id: "ChIJRc8nEKGG5IkRek2sl0Cwq9w", name: "Town Spa Pizza", rating: 4.4, lat: 42.114947, lon: -71.10107599999999, cuisine: "Thai")
Restaurant.create(restaurant_id: "ChIJ8UvAXFSB5IkROrphY1oT75o", name: "Subway", rating: 3.9, lat: 42.1340298, lon:  -71.10118109999999, cuisine: "")
Restaurant.create(restaurant_id: "ChIJ-xdl3dSA5IkR6Zw--zUJExo", name: "Five Guys", rating: 4.1, lat: 42.1404887, lon: -71.14672329999999, cuisine: "")
Restaurant.create(restaurant_id: "ChIJDfc-4SqH5IkRaxSPe7EUm0U", name: "Maxie's Deli", rating: 4.6, lat: 42.1382183, lon: -71.1478788, cuisine: "Mexican")
Restaurant.create(restaurant_id: "ChIJORa95iqH5IkREQuuRfvVZxE", name: "Chinatown", rating: 4.2, lat: 42.137982, lon: -71.14761299999999, cuisine: "Chinese")

Restaurant.all.each_with_index do |res, index|
  User.create(user_name: "User#{index}", email: "user#{index}@test.com",password: "password#{index}", phone_number: 123456789, zip_code: 12345)
end

Restaurant.all.each do |res|
  MenuItem.create(name: "Thai Rolls", price: 6, category: "veg", restaurant: res)
  MenuItem.create(name: "Spicy Calamari", price: 9, category: "non-veg", restaurant: res)
  MenuItem.create(name: "Buffalo Wings", price: 7, category: "non-veg", restaurant: res)
  MenuItem.create(name: "Chicken Pine Nut", price: 13, category: "non-veg", restaurant: res)
  MenuItem.create(name: "Chicken Pineapple", price: 11, category: "non-veg", restaurant: res)
end
#
#
# MenuItem.all.each do |mi|
#   Ingredient.create(name: "beans", menu_item: mi)
#   Ingredient.create(name: "avocado", menu_item: mi)
#   Ingredient.create(name: "taco", menu_item: mi)
#   Ingredient.create(name: "tomato", menu_item: mi)
# end

Restaurant.limit(2).each_with_index do |res, index|
  Review.create(rating: 4.8, comments: "Awesome dish", user: User.all[index], menu_item: MenuItem.all[index])
end

Restaurant.limit(2).each_with_index do |res, index|
  Review.create(rating: 4.7, comments: "Love it! Everyone must try this dish", user: User.all[index], menu_item: MenuItem.all[8])
end

Restaurant.limit(2).each_with_index do |res, index|
  Review.create(rating: 4.6, comments: "This is the best dish I ever had", user: User.all[index], menu_item: MenuItem.all[2])
end

Restaurant.limit(2).each_with_index do |res, index|
  Review.create(rating: 4.8, comments: "My boyfriend just loved this dish", user: User.all[index], menu_item: MenuItem.all[1])
end

Restaurant.limit(4).each_with_index do |res, index|
  Review.create(rating: 4.8, comments: "I want to try this dish again, just love it", user: User.all[index], menu_item: MenuItem.all[3])
end

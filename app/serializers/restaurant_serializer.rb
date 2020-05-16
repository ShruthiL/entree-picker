class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :cuisine, :rating, :lat, :lon
end

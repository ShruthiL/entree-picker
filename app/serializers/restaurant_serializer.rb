class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :cuisine, :rating, :lat, :lon
end

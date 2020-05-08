class MenuItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :category

  has_many :reviews
  belongs_to :restaurant
end

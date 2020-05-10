class MenuItem < ApplicationRecord
  validates :name, presence: true
  validates :price, numericality: true

  belongs_to :restaurant
  has_many :ingredients

  has_many :reviews
  has_many :users, through: :reviews

  has_one :picked_entree
end

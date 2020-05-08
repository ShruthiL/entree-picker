class Restaurant < ApplicationRecord
  validates :restaurant_id, presence: true, uniqueness: true
  validates :name, presence: true

  has_many :menu_items
end

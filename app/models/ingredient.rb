class Ingredient < ApplicationRecord
  validates :name, presence: true

  belongs_to :menu_item
end

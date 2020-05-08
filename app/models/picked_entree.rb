class PickedEntree < ApplicationRecord
  validates :selected_menu_option, uniqueness: true
  validates :menu_item, uniqueness: true

  belongs_to :selected_menu_option
  belongs_to :user
  belongs_to :menu_item
end

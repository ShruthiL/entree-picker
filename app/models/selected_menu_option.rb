class SelectedMenuOption < ApplicationRecord
  belongs_to :user
  has_one :picked_entree
end

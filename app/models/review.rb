class Review < ApplicationRecord
  validates :rating, presence: true, numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 5}

  belongs_to :user
  belongs_to :menu_item

  validates_uniqueness_of :menu_item_id, :scope => :user_id
end

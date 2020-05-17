class User < ApplicationRecord
  validates :user_name, presence: true, uniqueness: true

  has_many :selected_menu_options
  has_many :picked_entree

  has_many :reviews
  has_many :MenuItems, through: :reviews

  has_one :site_review
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end

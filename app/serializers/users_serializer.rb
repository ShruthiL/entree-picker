class UsersSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :admin

  has_one :review
end

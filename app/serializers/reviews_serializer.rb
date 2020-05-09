class ReviewsSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comments, :updated_at

  belongs_to :user
end

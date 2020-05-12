class SiteReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comments, :user_id

  belongs_to :user
end

class PickedEntreeSerializer < ActiveModel::Serializer
  attributes :id, :saved, :visited, :restaurant, :reviews
  belongs_to :menu_item

  def restaurant
    object.menu_item.restaurant
  end

  def reviews
    object.menu_item.reviews.each do |rev|
      if rev.user_id == scope.id
        return rev
      end
    end
    return ""
  end
end

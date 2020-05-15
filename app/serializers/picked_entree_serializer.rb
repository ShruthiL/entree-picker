class PickedEntreeSerializer < ActiveModel::Serializer
  attributes :id, :saved, :visited, :created_date_format, :restaurant, :reviews
  belongs_to :menu_item

  def restaurant
    object.menu_item.restaurant
  end

  def created_date_format
    object.created_at.strftime("%Y-%m-%d")
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

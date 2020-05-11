class AddColumnsToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :price_range, :integer
    add_column :restaurants, :address, :string
  end
end

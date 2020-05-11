class AddColumnsToMenuItems < ActiveRecord::Migration[5.2]
  def change
    add_column :menu_items, :menu_item_id, :integer
    change_column :menu_items, :price, :integer, :null => true
    change_column :menu_items, :category, :string, :null => true
  end
end

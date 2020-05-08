class MenuItems < ActiveRecord::Migration[5.2]
  def change
    create_table :menu_items do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.string :category, null: false

      t.belongs_to :restaurant
      t.timestamps
    end
  end
end

class CreateSelectedMenuOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :selected_menu_options do |t|
      t.float :lat
      t.float :lon
      t.integer :zip_code
      t.integer :radius
      t.float :rating
      t.string :cuisine
      t.float :price
      t.string :category
      t.string :ingredients

      t.belongs_to :user, null: false
      t.timestamps
    end
  end
end

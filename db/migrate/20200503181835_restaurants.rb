class Restaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :restaurant_id, null: false
      t.string :name, null: false
      t.string :cuisine
      t.float :rating
      t.float :lat
      t.float :lon

      t.timestamps
    end

    add_index :restaurants, :restaurant_id, unique: true
  end
end

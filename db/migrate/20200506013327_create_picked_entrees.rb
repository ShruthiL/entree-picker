class CreatePickedEntrees < ActiveRecord::Migration[5.2]
  def change
    create_table :picked_entrees do |t|
      t.boolean :saved, default: true
      t.boolean :visited, default: false

      t.belongs_to :selected_menu_option, null: false, unique: true
      t.belongs_to :menu_item, null: false, unique: true
      t.belongs_to :user, null: false
      t.timestamps
    end
  end
end

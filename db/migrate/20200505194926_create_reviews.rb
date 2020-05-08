class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.float :rating, null: false
      t.string :comments

      t.belongs_to :user
      t.belongs_to :menu_item
      t.timestamps
    end
  end
end

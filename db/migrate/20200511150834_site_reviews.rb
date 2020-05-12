class SiteReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :site_reviews do |t|
      t.float :rating, null: false
      t.string :comments

      t.belongs_to :user
      t.timestamps
    end
  end
end

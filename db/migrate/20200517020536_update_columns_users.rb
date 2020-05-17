class UpdateColumnsUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :phone_number, :string, :null => true
    change_column :users, :zip_code, :integer, :null => true
  end
end

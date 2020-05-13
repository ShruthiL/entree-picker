require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  it { should validate_presence_of(:name) }
  it { should have_valid(:name).when("peanuts")}
  it { should_not have_valid(:name).when(nil, "") }
  
  it { should belong_to(:menu_item) }
end

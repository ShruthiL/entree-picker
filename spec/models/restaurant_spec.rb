require 'rails_helper'

RSpec.describe Restaurant, type: :model do
  it { should validate_presence_of(:restaurant_id) }
  it { should validate_presence_of(:name) }
  it { should have_valid(:restaurant_id).when("testxgip")}
  it { should have_valid(:name).when("restaurant")}
  it { should have_many(:menu_items) }

  it "is not valid without a unique restaurant id" do
    restaurant1 = Restaurant.create(
      restaurant_id: "testxm",
      name: "restaurant1"
    )

    restaurant2 = Restaurant.create(
      restaurant_id: "testxm",
      name: "restaurant2"
    )

    expect(restaurant2).to_not be_valid
    expect(restaurant2.errors.full_messages.to_sentence).to eq("Restaurant has already been taken")
  end
end

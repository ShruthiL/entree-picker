require 'rails_helper'

RSpec.describe MenuItem, type: :model do
  it { should validate_presence_of(:name) }
  it { should have_valid(:name).when("biryani")}
  it { should have_valid(:price).when(3.2)}

  it { should have_valid(:name).when("nil, """)}
  it { should have_many(:ingredients) }
  it { should have_many(:reviews) }
  it { should have_many(:users) }
  it { should belong_to(:restaurant) }
  it { should have_one(:picked_entree) }
end

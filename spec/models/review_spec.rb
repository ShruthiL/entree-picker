require 'rails_helper'

RSpec.describe Review, type: :model do
  it { should have_valid(:rating).when(3.2)}
  it { should have_valid(:comments).when("i am reviewing this.")}

  it { should_not have_valid(:rating).when(nil, "", 6, -1, "three") }
  it { should belong_to(:user) }
  it { should belong_to(:menu_item) }
end

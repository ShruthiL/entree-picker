require 'rails_helper'

RSpec.describe PickedEntree, type: :model do
  it { should have_valid(:saved).when(true)}
  it { should have_valid(:visited).when(false)}
  it { should belong_to(:selected_menu_option) }
  it { should belong_to(:user) }
  it { should belong_to(:menu_item) }
end

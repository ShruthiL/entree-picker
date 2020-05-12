require 'rails_helper'

RSpec.describe SelectedMenuOption, type: :model do
  it { should belong_to(:user) }
end

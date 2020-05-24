require 'rails_helper'

RSpec.describe Api::V1::CurrentUserPickedEntreesController, type: :controller do
  describe "GET#index" do
    let!(:user1) { User.create(
      email: "email@email.com",
      user_name: "user1",
      password: "password",
      phone_number: 123456789,
      zip_code: 123456)
    }
    let!(:user2) { User.create(
      email: "email2@email.com",
      user_name: "user2",
      password: "password",
      phone_number: 123456789,
      zip_code: 123456)
    }
    let!(:restaurant1) { Restaurant.create(
      restaurant_id: "resid",
      name: "restaurant")
    }
    let!(:menu_item1) { MenuItem.create(
      name: "menu1",
      price: 3,
      restaurant_id: restaurant1.id
      )
    }

    let!(:menu_item2) { MenuItem.create(
      name: "menu2",
      price: 3,
      restaurant_id: restaurant1.id
      )
    }

    let!(:selected_menu_option1) { SelectedMenuOption.create(
        lat: "menu1",
        lon: 3,
        user_id: user1.id
      )
    }

    let!(:selected_menu_option2) { SelectedMenuOption.create(
        lat: "menu1",
        lon: 3,
        user_id: user1.id
      )
    }

    let!(:selected_menu_option3) { SelectedMenuOption.create(
        lat: "menu1",
        lon: 3,
        user_id: user2.id
      )
    }

    let!(:picked_entree1) { PickedEntree.create(
        selected_menu_option: selected_menu_option1,
        user: user1,
        menu_item: menu_item1,
        saved: true,
        visited: false
      )
    }

    let!(:picked_entree2) { PickedEntree.create(
        selected_menu_option: selected_menu_option2,
        user: user1,
        menu_item: menu_item2,
        saved: true,
        visited: false
      )
    }

    let!(:picked_entree3) { PickedEntree.create(
        selected_menu_option: selected_menu_option3,
        user: user2,
        menu_item: menu_item2,
        saved: true,
        visited: false
      )
    }

    it "returns a successful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all entrees for the current user in the database" do
      sign_in user1
      get :index
      response_body = JSON.parse(response.body)
      
      expect(response_body.length).to eq 1
      expect(response_body[DateTime.current.strftime('%Y-%m-%d')]).to eq 2
    end
  end
end

require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  describe "POST#create" do
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

    it "adds a new review to the db" do
      sign_in user1

      good_review_data = { user_id: user1.id, review: { rating: 1, body: "It's a review", menu_item_id: menu_item1.id }}
      before_count = Review.count
      post :create, params: good_review_data, format: :json
      after_count = Review.count

      expect(after_count).to eq (before_count + 1)
    end

    it "returns the new review as json" do
      sign_in user1

      good_review_data = { user_id: user1.id, review: { rating: 1, body: "It's a review", menu_item_id: menu_item1.id }}
      post :create, params: good_review_data, format: :json
      api_response = JSON.parse(response.body)

      num_params = 7

      expect(api_response.length).to eq num_params
      expect(api_response["rating"]).to eq good_review_data[:review][:rating]
      expect(api_response["comments"]).to eq good_review_data[:review][:comments]
      expect(api_response["user_id"]).to eq user1[:id]
      expect(api_response["menu_item_id"]).to eq menu_item1[:id]
    end

    it "does not add incomplete/bad info to db" do
      sign_in user2

      bad_review_data = { user_id: user1.id, review: { rating: " ", body: "It's a review", menu_item_id: menu_item1.id }}

      before_count = Review.count
      post :create, params: bad_review_data, format: :json
      after_count = Review.count

      expect(after_count).to eq before_count
    end

    it "returns validation error json" do
      sign_in user2

      bad_review_data = { user_id: user1.id, review: { rating: " ", body: "It's a review", menu_item_id: menu_item1.id }}

      post :create, params: bad_review_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Rating can't be blank and Rating is not a number"
    end
  end

  describe("GET#edit") do
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

    it "returns successful response code and json content" do
      sign_in user1

      existing_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )
      get :edit, params: { id: existing_review.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns the one review to be edited" do
      sign_in user1

      existing_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )
      get :edit, params: { id: existing_review.id }
      api_response = JSON.parse(response.body)
      expect(api_response.length).to eq 7

      expect(api_response['id']).to eq existing_review.id
      expect(api_response['user_id']).to eq existing_review.user.id
      expect(api_response['menu_item_id']).to eq existing_review.menu_item.id
      expect(api_response['rating']).to eq existing_review.rating
      expect(api_response['comments']).to eq existing_review.comments
    end

    it "does not return another review" do
      sign_in user1

      existing_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )

      existing_review2 = Review.create(
        user: user2,
        menu_item: menu_item1,
        rating: 4,
        comments: "So good"
      )
      get :edit, params: { id: existing_review.id }
      api_response = JSON.parse(response.body)
      expect(api_response['id']).not_to eq existing_review2.id
    end
  end

  describe("POST#update") do
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

    it "does not add an additional review to the db" do
      sign_in user1

      new_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )
      before_update_count = Review.count

      updated_review_params = {
        rating: 4,
        comments: "Such a good entree"
      }
      patch :update, params: { id: new_review.id, review: updated_review_params }
      after_update_count = Review.count

      expect(before_update_count).to eq after_update_count
    end

    it "returns the updated review" do
      sign_in user1

      new_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )

      updated_review_params = {
        rating: 4,
        comments: "Such a good entree"
      }

      patch :update, params: { id: new_review.id, review: updated_review_params }
      api_response = JSON.parse(response.body)

      expect(api_response['id']).to eq new_review.id
      expect(api_response['comments']).to eq updated_review_params[:comments]
      expect(api_response['rating']).to eq updated_review_params[:rating]
      expect(api_response['user_id']).to eq new_review.user.id
    end

    it "returns errors with poor data" do
      sign_in user2

      new_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )

      updated_review_params = {
        rating: "",
        comments: "Such a good entree"
      }

      patch :update, params: { id: new_review.id, review: updated_review_params }
      api_response = JSON.parse(response.body)

      expect(api_response['errors']).to eq "Rating can't be blank and Rating is not a number"
    end
  end

  describe("POST#destroy") do
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

    it "removes a review from the database" do
      sign_in user1

      new_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )

      before_delete_count = Review.count
      delete :destroy, params: { id: new_review.id }
      after_delete_count = Review.count

      expect(after_delete_count).to eq(before_delete_count - 1)
    end

    it "returns true when it removes the review" do
      sign_in user1

      new_review = Review.create(
        user: user1,
        menu_item: menu_item1,
        rating: 5,
        comments: "Such a good entree"
      )

      delete :destroy, params: { id: new_review.id }
      api_response = JSON.parse(response.body)

      expect(api_response['id']).to eq new_review.id
      expect(api_response['comments']).to eq new_review[:comments]
      expect(api_response['rating']).to eq new_review[:rating]
      expect(api_response['user_id']).to eq new_review.user.id
    end
  end
end

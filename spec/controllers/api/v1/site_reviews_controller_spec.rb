require 'rails_helper'

RSpec.describe Api::V1::SiteReviewsController, type: :controller do

  describe "GET#show" do
    let!(:user1) { User.create(
      email: "email@email.com",
      user_name: "user1",
      password: "password",
      phone_number: 123456789,
      zip_code: 123456)
    }

    let!(:sitereview1) { SiteReview.create(
      user: user1,
      rating: 5,
      comments: "Awesome Site")
    }

    it "returns successful response code and json content" do
      get :index
      response_body = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(response_body.length).to eq 2
      expect(response_body["site_reviews"][0]["rating"]).to eq sitereview1.rating
      expect(response_body["site_reviews"][0]["comments"]).to eq sitereview1.comments
    end
  end

  describe "POST#create" do
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

      good_review_data = { user_id: user1.id, review: { rating: 1, body: "It's a review" }}
      before_count = SiteReview.count
      post :create, params: good_review_data, format: :json
      after_count = SiteReview.count

      expect(after_count).to eq (before_count + 1)
    end

    it "returns the new review as json" do
      sign_in user1

      good_review_data = { user_id: user1.id, review: { rating: 1, body: "It's a review"}}
      post :create, params: good_review_data, format: :json
      api_response = JSON.parse(response.body)
      num_params = 5

      expect(api_response.length).to eq num_params
      expect(api_response["rating"]).to eq good_review_data[:review][:rating]
      expect(api_response["comments"]).to eq good_review_data[:review][:comments]
      expect(api_response["user_id"]).to eq user1[:id]
    end

    it "does not add incomplete/bad info to db" do
      sign_in user2

      bad_review_data = { user_id: user1.id, review: { rating: " ", body: "It's a review"}}

      before_count = SiteReview.count
      post :create, params: bad_review_data, format: :json
      after_count = SiteReview.count

      expect(after_count).to eq before_count
    end
  end

  describe("POST#update") do
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

      new_review = SiteReview.create(
        user: user1,
        rating: 5,
        comments: "Awesome Site"
      )
      before_update_count = SiteReview.count

      updated_review_params = {
        rating: 4,
        comments: "Awesome Site"
      }
      patch :update, params: { id: new_review.id, review: updated_review_params }
      after_update_count = SiteReview.count

      expect(before_update_count).to eq after_update_count
    end

    it "returns the updated review" do
      sign_in user1

      new_review = SiteReview.create(
        user: user1,
        rating: 5,
        comments: "Awesome Site"
      )

      updated_review_params = {
        rating: 4,
        comments: "Awesome Site"
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

      new_review = SiteReview.create(
        user: user1,
        rating: 5,
        comments: "Awesome Site"
      )

      updated_review_params = {
        rating: "",
        comments: "Awesome Site"
      }

      patch :update, params: { id: new_review.id, review: updated_review_params }
      api_response = JSON.parse(response.body)

      expect(api_response['errors']).to eq "Rating can't be blank and Rating is not a number"
    end
  end

  describe("POST#destroy") do
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

      new_review = SiteReview.create(
        user: user1,
        rating: 5,
        comments: "Awesome Site"
      )

      before_delete_count = SiteReview.count
      delete :destroy, params: { id: new_review.id }
      after_delete_count = SiteReview.count

      expect(after_delete_count).to eq(before_delete_count - 1)
    end

    it "returns true when it removes the review" do
      sign_in user1

      new_review = SiteReview.create(
        user: user1,
        rating: 5,
        comments: "Awesome Site"
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

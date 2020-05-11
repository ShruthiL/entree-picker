class Api::V1::SiteReviewsController < ApplicationController
  before_action :authenticate_user!, except:[:index]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: { current_user_review: SiteReview.where(user: current_user), site_reviews: SiteReview.all }
  end

  def create
    new_site_review = SiteReview.new(site_review_params)
    new_site_review.user = current_user
    if new_site_review.save
      render json: new_site_review
    else
      render json: { errors: new_site_review.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def update
    updated_site_review = SiteReview.find(params[:id])
    if updated_site_review.update(site_review_params)
      render json: updated_site_review
    else
      render json: { errors: updated_site_review.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end


  def destroy
    deleted_site_review = SiteReview.find(params[:id]).delete
    render json: deleted_site_review
  end

  private

  def site_review_params
    params.require(:review).permit(:rating, :comments)
  end
end

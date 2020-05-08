class Api::V1::ReviewsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def update
    updated_review = Review.find(params[:id])
    if updated_review.update(review_params)
      render json: updated_review
    else
      render json: { errors: updated_review.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def destroy
    deleted_review = Review.find(params[:id]).delete
    render json: deleted_review
  end

  private

  def review_params
    params.require(:review).permit(:rating, :comments, :user_id, :menu_item_id)
  end
end

class Api::V1::CurrentUserPickedEntreesController < ApplicationController
  before_action :authenticate_user!, except:[:index]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: PickedEntree.where(user: current_user).group("date(created_at)").order("date_created_at").count
  end
end

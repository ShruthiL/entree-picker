class Api::V1::AllUsersPickedEntreesController < ApplicationController
  before_action :authenticate_user!, except:[:index]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: PickedEntree.all.group("date(created_at)").order("date_created_at").count
  end
end

class Api::V1::ChangeThemesController < ApplicationController
  before_action :authenticate_user!, except:[:index]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    if session['theme'] == "light_path"
      session['theme'] = "dark_path"
    else
      session['theme'] = "light_path"
    end
    render json: {}
  end
end

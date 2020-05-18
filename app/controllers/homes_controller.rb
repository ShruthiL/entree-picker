class HomesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :switch_theme]
  def index
    if session['theme'] == nil
      session['theme'] == "light_path"
    end
  end

  def authenticate

  end
  def switch_theme
    if session['theme'] == "light_path"
      session['theme'] = "dark_path"
    else
      session['theme'] = "light_path"
    end
    redirect_to request.headers["HTTP_REFERER"]
  end
end

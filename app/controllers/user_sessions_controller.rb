class UserSessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]
  layout "login"

  def new
    @user = User.new
  end

  def create
    if @user = login(params[:email], params[:password])
      redirect_to("/", notice: 'Login successful')
    else
      flash.now[:alert] = "Login failed"
      render action: "new"
    end
  end

  def destroy
    logout
    redirect_to("login", notice: 'Logged out!')
  end
end

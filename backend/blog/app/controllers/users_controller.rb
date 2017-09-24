class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors.details
    end
  end

  def destroy
    @user.destroy
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end

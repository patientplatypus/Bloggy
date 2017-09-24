class PostsController < ApplicationController
  # before_action only: [:show, :update, :destroy, :create] do
  #   :find_user
  # end
  before_action :require_login
  # before_action
  # before_action do
  #   :find_user
  # end

  # before_action :find_user, except: []

  before_action :post_params, except: [:index]


  # GET /posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    allparams = post_params
    user = User.find_by(email: allparams['user_email'])
    puts 'this is the user: '
    puts user
    puts '********************'
    if user==nil
      puts 'inside user nil'
      render json: 'error - user email does not exist '
    else
      @post = user.posts.create(post_params)
      render json: {'created': @post}
    end
  end

  # PATCH/PUT /posts/1
  def update
    allparams = post_params
    user = User.find_by(email: allparams['user_email'])
    puts 'this is the user: '
    puts user
    puts '********************'
    if user==nil
      puts 'inside user nil'
      render json: 'error - user email does not exist '
    else
      @post = user.posts.update(post_params)
      returnstring = 'post with id ' + allparams[post_id] + 'updated!'
      render json: {'updated': @post}
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

    def post_params
      params.require(:post).permit(:post_title, :post_body, :user_email, :post_id)
    end

end

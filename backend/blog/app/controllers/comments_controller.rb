class CommentsController < ApplicationController
  before_action :require_login

  before_action :comment_params, except: [:index]

  # GET /posts
  def index
    @comments = Comment.all
    render json: @comments
  end

  # GET /posts/1
  def show
    render json: @comment
  end

  # POST /posts
  def create
    allparams = comment_params
    puts 'these are all the params: '
    puts allparams
    post = Post.find_by(post_index_number: allparams['post_index_number'])
    puts 'this is the post: '
    puts post
    puts '********************'
    if post==nil
      puts 'inside post nil'
      render json: 'error - post email does not exist '
    else
      @comment = post.comments.create(comment_params)
      render json: {'created': @comment}
    end
  end

  # PATCH/PUT /posts/1
  def update
    allparams = comment_params
    post = Post.find_by(post_index_number: allparams['post_index_number'])
    puts 'this is the post: '
    puts post
    puts '********************'
    if post==nil
      puts 'inside post nil'
      render json: 'error - post email does not exist '
    else
      @comment = post.comments.update(comment_params)
      render json: {'updated': @comment}
    end
  end

  # DELETE /posts/1
  def destroy
    @comment.destroy
  end

  private

    def comment_params
      params.require(:comment).permit(:comment_body, :post_index_number)
    end
end

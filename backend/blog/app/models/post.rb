class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  before_create :randomize_id

  private

  def randomize_id
    begin
      postindexnumber = SecureRandom.random_number(1_000_000_000)
      self.post_index_number = postindexnumber
      puts 'self.post_index_number'
      puts self.post_index_number
    end while Post.where(post_index_number: postindexnumber).exists?
  end

end

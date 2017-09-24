class Comment < ApplicationRecord
  belongs_to :post
  before_create :randomize_id

  def randomize_id
    begin
      commentindexnumber = SecureRandom.random_number(1_000_000_000)
      self.comment_index_number = commentindexnumber
      puts 'self.comment_index_number'
      puts self.comment_index_number
    end while Comment.where(comment_index_number: commentindexnumber).exists?
  end

end

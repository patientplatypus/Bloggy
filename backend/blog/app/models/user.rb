class User < ApplicationRecord
  has_secure_password
  has_secure_token

  validates :email, uniqueness: true
  validate :check_password_and_password_confirmation

  has_many :posts, dependent: :destroy
  # This method is not available in has_secure_token
  def invalidate_token
    self.update_columns(token: nil)
  end

  def self.valid_login?(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end

  def check_password_and_password_confirmation
    errors.add(:password, ' does not match confirmation!') if password != password_confirmation
  end





  # validates :email, uniqueness: {scope: [:name]}

end

class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :comment_body
      t.integer :post_id
      t.integer :post_index_number
      t.integer :comment_index_number
      t.timestamps
    end
  end
end

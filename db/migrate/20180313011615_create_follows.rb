class CreateFollows < ActiveRecord::Migration[5.1]
  def change
    create_table :follows do |t|
      t.integer :follower_id
      t.integer :followee_id

      t.timestamps
    end
    add_index :follows, :follower_id
    add_index :follows, :followee_id
  end
end

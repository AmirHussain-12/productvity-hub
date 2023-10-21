class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.string :name, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end

class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people do |t|
      t.string :name
      t.string :company
      t.string :title
      t.string :gender
      t.string :education

      t.timestamps
    end
  end
end

class CreateStatuses < ActiveRecord::Migration
  def change
    create_table :statuses do |t|
      t.string :object
      t.string :system
      t.string :process
      t.string :current
      t.string :description
      t.integer :status_type
    end
  end
end

class Status < ActiveRecord::Base
  DANGER=0
  INFORMATION=1

  default_scope { order("id DESC") }
  scope :dangers, -> { where(status_type: DANGER) }
  scope :informations, -> { where(status_type: INFORMATION) }

end

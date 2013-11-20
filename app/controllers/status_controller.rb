class StatusController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  skip_before_filter :require_login

  def create
    @status = Status.new(status_params)
    @status.save!
    WebsocketRails[:statuses].trigger 'new', @status
    render nothing: true
  end

  private
  def status_params
    params.require(:status).permit(:object, :system, :process, :current, :description, :status_type)
  end
end

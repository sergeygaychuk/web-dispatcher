class EventsController < ApplicationController
  def index
    @statuses = Status.all
    render json: @statuses
  end

  def dangers
    @statuses = Status.dangers
    render json: @statuses
  end

  def informations
    @statuses = Status.informations
    render json: @statuses
  end
end

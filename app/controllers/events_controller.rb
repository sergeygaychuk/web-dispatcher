class EventsController < ApplicationController
  def index
    @statuses = Status.all
    render json: @statuses
  end

  def dangers
    @statuses = Status.dangers

    p "Queue size: #{Sidekiq::Queue.new.size}"

    render json: @statuses
  end

  def informations
    @statuses = Status.informations
    render json: @statuses
  end
end

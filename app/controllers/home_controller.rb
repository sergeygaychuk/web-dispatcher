class HomeController < ApplicationController
  def index
  end

  def events
    @statuses = Status.all
    render "events", layout: false
  end

  def dangers
    @statuses = Status.dangers
    render "events", layout: false
  end

  def informations
    @statuses = Status.informations
    render "events", layout: false
  end
end

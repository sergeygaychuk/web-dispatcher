class MemcachedInterviewer
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { minutely }

  def perform()
    rand = Random.new
    type = rand.rand(2)
    p type
    status = {
      object: "Toksovo",
      system: 'Electricity',
      process: 'OTP_control',
      current: rand.rand(1000),
      description: 'Hello world',
      status_type: type
    }

    @status = Status.new(status)
    @status.save!
    ActiveSupport::Notifications.instrument("status.inserted", id: @status.id)
  end

end


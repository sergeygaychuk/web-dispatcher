
require 'reloader/sse'

class StatusController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  skip_before_filter :require_login
	include ActionController::Live

	def listen
		# SSE expects the `text/event-stream` content type
		response.headers['Content-Type'] = 'text/event-stream'

		sse = Reloader::SSE.new(response.stream)

    begin

      loop do
        sse.write({dir: [Dir.pwd]}, event: :info)
        sleep 10
      end
      #ActiveSupport::Notifications.subscribe "status.inserted"  do |name, start, finish, id, payload|
        #WebsocketRails[:statuses].trigger 'new', Status.find(payload[:id])
			#	sse.write(payload, event: :inserted)
      #end

		rescue IOError
			# When the client disconnects, we'll get an IOError on write
		ensure
			sse.close
		end
  end

end


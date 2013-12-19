ActiveSupport::Notifications.subscribe "status.inserted"  do |name, start, finish, id, payload|
  Rails.logger.debug "STATUS: #{payload[:id]}"
  WebsocketRails[:statuses].trigger 'new', Status.find(payload[:id])
end


class ChatController < WebsocketRails::BaseController
  def connected()
    p "Hello connected user"
  end

  def disconnected()
    p "Bye connected user"
  end
end

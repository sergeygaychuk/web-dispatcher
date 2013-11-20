# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Dispatch::Application.config.secret_key_base = '16c0f79c5e882a635a0644ab77a85e306a8301ac2d739beb7fca715048eb0262cb4a762054638405477dfea0ceaaadf6508435b10e19b5020172fa248f05838b'

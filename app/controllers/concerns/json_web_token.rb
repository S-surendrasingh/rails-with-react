require "jwt"

module JsonWebToken
  extend ActiveSupport::Concern

  SECRET_KEY = Rails.application.credentials.devise_jwt_secret_key || Rails.application.secret_key_base

  def jwt_encode(payload, exp = 7.days.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    return nil if token.nil?

    begin
      decoded = JWT.decode(token, SECRET_KEY)[0]

      if decoded["exp"] < Time.now.to_i
        raise JWT::ExpiredSignature
      end

      HashWithIndifferentAccess.new(decoded)

    rescue JWT::DecodeError
      raise StandardError, "Invalid token"
    rescue JWT::ExpiredSignature
      raise StandardError, "Token has expired"
    end
  end
end

class ApplicationController < ActionController::Base
  include JsonWebToken
  skip_before_action :verify_authenticity_token
  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers["Authorization"]

    if header.nil?
      render json: { error: "Token is missing" }, status: :unauthorized
      return
    end

    token = header.split(" ").last

    begin
      decoded = jwt_decode(token)
      @current_user = User.find(decoded[:user_id])
    rescue JWT::DecodeError, JWT::ExpiredSignature
      render json: { error: "Invalid or expired token" }, status: :unauthorized
    end
  end
end

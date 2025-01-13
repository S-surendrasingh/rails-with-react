class Users::SessionsController < Devise::SessionsController
  skip_before_action :authenticate_request, on: :create
  respond_to :json
  private

  def respond_with(current_user, _opts = {})
    token = jwt_encode(user_id: current_user.id)
    render json: {
      status: {
        code: 200, message: "Logged in successfully.",
        data: { user: current_user, token: token }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers["Authorization"].present?
      token = request.headers["Authorization"].split(" ").last

      begin
        decoded = jwt_decode(token)

        current_user = User.find(decoded[:user_id])

        if current_user
          render json: {
            status: 200,
            message: "Logged out successfully."
          }, status: :ok
        else
          render json: {
            status: 401,
            message: "Couldn't find an active session."
          }, status: :unauthorized
        end
      rescue JWT::DecodeError, JWT::ExpiredSignature => e
        render json: {
          status: 401,
          message: "Invalid or expired token. Please log in again."
        }, status: :unauthorized
      end
    else
      render json: {
        status: 401,
        message: "Token is missing. Please log in again."
      }, status: :unauthorized
    end
  end
end

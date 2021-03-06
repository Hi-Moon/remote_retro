defmodule RemoteRetroWeb.PageController do
  use RemoteRetroWeb, :controller

  def index(conn, _params) do
    current_user_id = get_session(conn, :current_user_id)

    case current_user_id do
      nil ->
        render(conn, "index.html", %{is_landing_page: true, omit_header: true})
      _user ->
        redirect(conn, to: "/retros")
    end
  end

  def faq(conn, _params) do
    render(conn, "faq.html")
  end
end

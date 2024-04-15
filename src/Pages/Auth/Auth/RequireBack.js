import { Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("usertoken");
  return token ? window.history.back() : <Outlet />;
}
export default RequireBack;

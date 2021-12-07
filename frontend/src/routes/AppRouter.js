import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ajustes from "../pages/ajustes/Ajustes.jsx";
import Buscar from "../pages/buscar/Buscar.jsx";
import Cuenta from "../pages/cuenta/Cuenta.jsx";
import Descubrir from "../pages/descubrir/Descubrir.jsx";
import Editar from "../pages/editar/Editar.jsx";
import Inicio from "../pages/inicio/Inicio.jsx";
import Login from "../pages/login/login.jsx";
import Navigation from "../pages/navigation/Navigation.jsx";
import Registrarse from "../pages/registrarse/Registrarse.jsx";
import routes from "../helpers/routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import useAuth from "../auth/useAuth";
import Preferences from "../pages/preferences/preferences.jsx";
import Amigos from "../pages/amigos/amigos.jsx";
import Solicitudes from "../pages/solicitudes/solicitudes.jsx";

export default function AppRouter() {
  const { fromRegister } = useAuth();
  console.log(fromRegister);
  function nav() {
    if (fromRegister === false) {
      return <Navigation></Navigation>;
    }
  }
  return (
    <Router>
      {nav()}
      <Switch>
        <Route exact path={routes.inicio} component={Inicio}></Route>
        <PublicRoute
          exact
          path={routes.ingresar}
          component={Login}
        ></PublicRoute>
        <PrivateRoute
          exact
          path={routes.editar}
          component={Editar}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={routes.preferencias}
          component={Preferences}
        ></PrivateRoute>
        <PublicRoute
          exact
          path={routes.registro}
          component={Registrarse}
        ></PublicRoute>
        <PrivateRoute
          exact
          path={routes.ajustes}
          component={Ajustes}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={routes.buscar}
          component={Buscar}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={routes.descubrir}
          component={Descubrir}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={routes.cuenta}
          component={Cuenta}
        ></PrivateRoute>

        <PrivateRoute
          exact
          path={routes.amigos}
          component={Amigos}
        ></PrivateRoute>

        <PrivateRoute
          exact
          path={routes.solicitudes}
          component={Solicitudes}
        ></PrivateRoute>
      </Switch>
    </Router>
  );
}

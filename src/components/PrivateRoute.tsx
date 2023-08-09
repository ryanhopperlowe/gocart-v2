import { Session } from "@supabase/supabase-js";
import { Redirect, Route } from "react-router";

interface PrivateRouteProps {
  component: React.FC;
  path?: string;
  exact?: boolean;
  session?: Session | null;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  // console.log("canAccess", props.canAccess);

  return (
    <Route {...rest}>
      {props.session ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

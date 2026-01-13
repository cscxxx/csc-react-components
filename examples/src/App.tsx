import { Outlet, NavLink } from "react-router";
import { cn } from "./lib/cn";

function App() {
  const getNavLinkClassName = (additionalClasses?: string) => {
    return ({ isActive }: { isActive: boolean }) =>
      cn("mx-2 px-2 py-1", additionalClasses, {
        "bg-blue-500 text-white rounded-md": isActive,
      });
  };

  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" className={getNavLinkClassName("mr-2.5")} end>
            首页
          </NavLink>
          <NavLink to="/components/button" className={getNavLinkClassName()}>
            Button
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

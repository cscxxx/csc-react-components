import { Outlet, NavLink } from "react-router";

function App() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" style={{ margin: 10 }} end>
            首页
          </NavLink>
          <NavLink to="/components/button">Button</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink
} from "remix";

import rootStyles from './styles/root.css';

import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links = () => {
  return [{ rel: "stylesheet", href: rootStyles}];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ul className="nav-menu">
          <li>
            <NavLink 
              to="/posts" 
              className={({isActive}) => isActive? "current" : ""}>
                Posts
            </NavLink>
          </li>
          <li>
              <NavLink 
                to="/admin"
                className={({isActive}) => isActive? "current" : ""}
                >
                Admin section
              </NavLink>
          </li>
        </ul>
        <div className="container">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

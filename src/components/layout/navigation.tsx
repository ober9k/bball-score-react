import { useAuthContext } from "@/auth.tsx";
import * as styles from "@/components/layout/navigation.module.css"
import { authPaths } from "@/routes/auth/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Link } from "@tanstack/react-router";

type Link = {
  title: string,
  to: string,
  params?: object,
}

const links: Link[] = [
  { title: "League",     to: leaguePaths.League, },
  { title: "Games",      to: leaguePaths.Games.Index, },
  { title: "Players",    to: leaguePaths.Players.Index, },
  { title: "Teams",      to: leaguePaths.Teams.Index, },
  { title: "Standings",  to: leaguePaths.Standings, },
  { title: "Statistics", to: leaguePaths.Statistics, },
];

export default function Navigation() {
  const { isAuthenticated } = useAuthContext();

  const isExact = (link: Link): boolean => {
    return (link.to === leaguePaths.League);
  };

  return (
    <>
      <nav className={styles.navigation}>
        <Link className={styles.logoLink} to={"/"}>
          🏀
        </Link>
        {links.map((link, index) => (
          <Link key={index} to={link.to} activeOptions={{ exact: isExact(link) }} activeProps={{ className: styles.active }} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {(isAuthenticated()) ? (
          <Link to={authPaths.Logout} className={`${styles.link} ${styles.logoutLink}`}>
            Logout
          </Link>
        ) : (
          <Link to={authPaths.Login} className={`${styles.link} ${styles.loginLink}`}>
            Login
          </Link>
        )}
      </nav>
    </>
  );
}

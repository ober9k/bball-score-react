import { getRouteApi, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import Content from "../../components/layout/page/Content.tsx";
import Header from "../../components/layout/page/Header.tsx";
import { Paths } from "../../routes/paths.ts";

type ActionLinkProps = {
  children: ReactNode,
  to: string,  /* limit for this case */
  params?: { [key: string]: string }, /* temp, no limit for this case */
}
export function ActionLink({ children, to, params = {} }: ActionLinkProps) {
  return (
    <Link to={to} params={params} className={"py-0.5 px-2 mx-0.5 bg-gray-600 text-gray-200 text-bold rounded-sm"}>
      {children}
    </Link>
  );
}

export default function TeamsPage() {
  const { teams } = getRouteApi(Paths.Manager.Teams).useLoaderData();

  return (
    <>
      <Header>
        Manage Teams
      </Header>
      <Content>
        <div className={"box-score py-2"}>
          <table className={"w-full"}>
            <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className={"px-4 py-2 text-left text-sm"}>
                Team
              </th>
              <th className={"p-2 text-sm"}></th>
            </tr>
            </thead>
            <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="even:bg-gray-100">
                <td className={"px-4 py-2 text-left text-sm"}>
                  {team.name}
                </td>
                <td className={"p-2 text-sm text-right"}>
                  <ActionLink to={Paths.Manager.UpdateTeam} params={{ teamId: team.id }}>
                    Edit
                  </ActionLink>
                  <ActionLink to={"/tbd"}>
                    Delete
                  </ActionLink>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Content>
    </>
  )
}

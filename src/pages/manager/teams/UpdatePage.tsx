import { getRouteApi } from "@tanstack/react-router";
import { ReactNode, useActionState } from "react";
import Content from "../../../components/layout/page/Content.tsx";
import Header from "../../../components/layout/page/Header.tsx";
import { type TeamData, updateTeam } from "../../../data/actions.ts";
import { Paths } from "../../../routes/paths.ts";

const FormKeys = {
  Name: "team_name",
  TeamStyle: {
    BgColor:   "team_teamStyle_bgColor",
    TextColor: "team_teamStyle_textColor",
  },
}

type FormGroupProps = {
  children: ReactNode,
}

function FormGroup(props: FormGroupProps) {
  return (
    <>
      <div className={"py-1"}>
        {props.children}
      </div>
    </>
  )
}

type LabelProps = {
  children: ReactNode,
  htmlFor: string,
}

function Label(props: LabelProps) {
  return (
    <>
      <label htmlFor={props.htmlFor} className={"w-full block text-left px-2 py-1 text-sm"}>
        {props.children}
      </label>
    </>
  )
}

type InputProps = {
  htmlName: string,
  defaultValue: string,
}

function Input(props: InputProps) {
  return (
    <>
      <input type={"text"} name={props.htmlName} defaultValue={props.defaultValue.toString()} className={"w-full block text-left my-1 px-2 py-2 text-sm border-1 border-gray-200 rounded-sm"} />
    </>
  )
}

export default function UpdatePage() {
  const {team} = getRouteApi(Paths.Manager.UpdateTeam).useLoaderData();

  const initialState: TeamData = {
    id: team.id,
    name: team.name,
    teamStyle: {
      bgColor: team.teamStyle.bgColor,
      textColor: team.teamStyle.textColor,
    }
  };

  const [ state, formAction, isPending ] = useActionState(async (prevState: TeamData, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const teamData: TeamData = {
      id: team.id,
      name: getValue(FormKeys.Name),
      teamStyle: {
        bgColor:   getValue(FormKeys.TeamStyle.BgColor),
        textColor: getValue(FormKeys.TeamStyle.TextColor),
      }
    };

    await updateTeam(teamData);

    return {
      ...teamData
    }
  }, initialState);

  return (
    <>
      <Header>
        Manage Team
      </Header>
      <Content>
        <form action={formAction}>
          <FormGroup>
            <Label htmlFor={FormKeys.Name}>
              Name
            </Label>
            <Input htmlName={FormKeys.Name} defaultValue={state.name.toString()} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={FormKeys.TeamStyle.BgColor}>
              Background Color
            </Label>
            <Input htmlName={FormKeys.TeamStyle.BgColor} defaultValue={state.teamStyle.bgColor.toString()} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={FormKeys.TeamStyle.TextColor}>
              Text Color
            </Label>
            <Input htmlName={FormKeys.TeamStyle.TextColor} defaultValue={state.teamStyle.textColor.toString()} />
          </FormGroup>
          <FormGroup>
            <button type={"reset"} className={"border m-1 px-3 py-1 bg-gray-200 text-gray-600 text-bold rounded-sm"}>
              Reset
            </button>
            <button type={"submit"} className={"border m-1 px-3 py-1 bg-gray-600 text-gray-200 text-bold rounded-sm"}>
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </FormGroup>
        </form>
      </Content>
    </>
  )
}

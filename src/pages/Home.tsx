import usePageContext from "../components/hooks/usePageContext.ts";

export default function Home() {
  const { setTitle } = usePageContext();
  setTitle("Home");

  return (
    <>
      <p>
        Just experimenting with React and messing with some statistics.
      </p>
    </>
  )
}

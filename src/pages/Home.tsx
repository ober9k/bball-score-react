import usePageContext from "../components/hooks/usePageContext.ts";

export default function Home() {
  const { setTitle } = usePageContext();
  setTitle("Home");

  return (
    <>
      <p>
        built using React
      </p>
    </>
  )
}

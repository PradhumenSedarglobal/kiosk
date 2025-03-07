import { useProgressRouter } from "@/provider/router/useProgressRouter";
import LoadingScreen from "../loading-screen";
import StyledProgressBar from "./styles";

// ----------------------------------------------------------------------

export default function ProgressBar() {
  const { isLoading } = useProgressRouter();
  switch (isLoading) {
    case true:
      return (
        <>
          <LoadingScreen />
          <StyledProgressBar />
        </>
      );
      break;

    default:
      break;
  }
}

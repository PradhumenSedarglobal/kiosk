import { useContext } from "react";
import { ProfileContext } from "./profileProvider";

const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }

  return context;
};

export default useProfileContext;

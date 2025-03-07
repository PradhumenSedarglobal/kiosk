import React from "react";
import CommonPageComponent from "./common-page";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log(error, errorInfo, "ERROR-BOUNDRY");
    return { hasError: true };
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <CommonPageComponent
          image="/assets/images/error/Group25786.png"
          title={"Uh-oh, something went wrong here!"}
          subHeading={"Just keep browsing to get back on track"}
          buttonText={"Back To Home Page"}
          link="/"
          height="100%"
          imageSx={{
            aspectRatio: "1 / 1",
            width: "30% !important",
          }}
          imageWidth="100%"
          imgBoxSx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        />
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;

import SectionOne from "./sectionOne";
import SectionThree from "./sectionThree";
import SectionTwo from "./sectionTwo";

const ForgetPasswordForm = ({
  formik,
  handlePreviousStep,
  sectionStep,
  resendOTP,
}) => {
  switch (sectionStep) {
    case 0:
      return (
        <>
          <SectionOne formik={formik} />
        </>
      );
      break;
    case 1:
      return (
        <>
          <SectionTwo
            handlePreviousStep={handlePreviousStep}
            formik={formik}
            resendOTP={resendOTP}
          />
        </>
      );
      break;
    case 2:
      return (
        <>
          <SectionThree formik={formik} />
        </>
      );
      break;
  }
};

export default ForgetPasswordForm;

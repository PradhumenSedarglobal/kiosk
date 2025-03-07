import dynamic from "next/dynamic";
import PropTypes from "prop-types";
const ThemeRtlLayout = dynamic(() => import("./ThemeRtlLayout"), {
  ssr: true,
  loading: () => <></>,
});

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node,
};

export default function ThemeSettings({ children }) {
  return <ThemeRtlLayout>{children}</ThemeRtlLayout>;
}

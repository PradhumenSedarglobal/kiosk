import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useRouter } from "next/router";
export const CustomLink = (props) => {
  const {
    isExternalLink = false,
    link = "",
    lang = "",
    children,
    sx,
    target = "_self",
    rel = "",
    ...rest
  } = props;
  const { locale, pathname } = useRouter();

  const customLocale = locale != "default" ? locale : "";
  let hrefLink;

  if (link && link.startsWith("/")) {
    hrefLink = `/${customLocale}${link}`;
  } else {
    hrefLink =
      link && link.startsWith("https:") ? link : `/${customLocale}/${link}`;
  }
  return (
    <>
      <Link
        component={NextLink}
        href={isExternalLink ? link : hrefLink}
        target={target}
        locale={false}
        sx={{
          textDecoration: "none",
          color: "inherit",
          "&:hover": { textDecoration: "none" },
          ...sx,
        }}
        {...(rel && { rel: rel })}
        {...rest}
      >
        {children}
      </Link>
    </>
  );
};

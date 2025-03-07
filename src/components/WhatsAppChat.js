import { CustomWhatsappBox } from "@/styles/homepage/social";
import { WhatsApp } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function WhatsAppChat() {
  const router = useRouter();

  return (
    <CustomWhatsappBox
      asPath={router.asPath.indexOf("/customize") >= -1 ? true : false}
      className="whatsAppChat left"
    >
      <a
        target="_blank"
        href="https://wa.me/+97180073327"
        rel="noreferrer"
        aria-label="Whatsapp Me"
      >
        <WhatsApp
          sx={{
            marginTop: "4px",
            fontSize: (theme) => theme.typography.typography39,
            color: (theme) => theme.palette.common.white,
          }}
        />
      </a>
    </CustomWhatsappBox>
  );
}

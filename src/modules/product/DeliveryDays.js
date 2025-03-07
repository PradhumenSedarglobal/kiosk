import { useAuthContext } from "@/auth/useAuthContext";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import {
  DayNamesAR,
  DayNamesEN,
  MonthNamesAR,
  MonthNamesEN,
} from "../../sections/productDetail/Months";
export default function DeliveryDays({ status_days, status, data }) {
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cniso, langName } = cookies || {};
  const { t } = useTranslation("common");
  let to = Number(status_days);
  let from = to > 5 ? to - 2 : to - 1;
  let from_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * from);
  let to_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * to);

  const [f_day, setfday] = useState(from);
  const [t_day, setTday] = useState(to);

  const [fDatFun, setFDatFun] = useState(from_date);
  const [tDatFun, setTDatFun] = useState(to_date);
  let excludeDates = [];
  let days = t(`${status}`);

  const checkDayFun = (status_days) => {
    let day_st = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000 * Number(status_days)
    );
    if (cniso == "AE") {
      switch (day_st.getDay()) {
        case 0:
          from = Number(status_days) - 2;
          to = Number(status_days) + 1;
          break;
        case 2:
          from = Number(status_days) - 1;
          to = Number(status_days) + 1;
          break;
        default:
          from = Number(status_days) - 2;
          to = Number(status_days);
          break;
      }
    } else {
      switch (day_st.getDay()) {
        case 0:
          from = Number(status_days) - 1;
          to = Number(status_days) + 1;
          break;
        case 5:
          from = Number(status_days) - 2;
          to = Number(status_days) + 1;
          break;
        default:
          from = Number(status_days) - 2;
          to = Number(status_days);
          break;
      }
    }
    return { from: from, to: to };
  };
  const excludeDatesFun = (excludeDates, from) => {
    let fDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * from);
    let f_date = fDate.getDate();
    let differ_day = from > 5 ? 2 : 1;
    let next_date = f_date + differ_day;

    for (let i = 0; i < excludeDates.length; i++) {
      var exclude_date = excludeDates[i].getDate();
      if (
        exclude_date == f_date &&
        excludeDates[i].getMonth() == fDate.getMonth()
      ) {
        ++f_date;
        ++from;
      } else if (
        exclude_date == next_date &&
        excludeDates[i].getMonth() == fDate.getMonth()
      ) {
        f_date = f_date + differ_day;
        from = from + differ_day;
      }
    }

    return from;
  };
  useEffect(() => {
    to = Number(status_days);
    from = to > 5 ? to - 2 : to - 1;

    from_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * from);
    to_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * to);

    setfday(from);
    setTday(to);

    setFDatFun(from_date);
    setTDatFun(to_date);
  }, [status]);

  useEffect(() => {
    if (status == "ONDEMAND") {
      let t_date = excludeDatesFun(excludeDates, Number(status_days));
      let { from, to } = checkDayFun(t_date);
      setfday(from);
      setTday(to);

      let from_date11 = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000 * from
      );
      let to_date11 = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * to);

      setFDatFun(from_date11);
      setTDatFun(to_date11);
    }
  }, []);
  return (
    <Box className="DeliveryDays">
      {status_days > 0 && (
        <Grid container>
          <Grid item sm={12}>
            {status ? (
              <Chip
                sx={(theme) => ({
                  "& .MuiChip-label": {
                    fontFamily: `${theme.fontFaces.helveticaNeue} !important`,
                  },
                  height: 28,
                  ...theme.typography.typography14,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  lineHeight: "17px",
                  fontWeight: 500,
                  backgroundColor:
                    status == "INSTOCK"
                      ? `${theme.palette.success.darkerGreen}!important`
                      : status == "ONDEMAND"
                        ? `${theme.palette.grey[6100]}!important`
                        : status == "EXPRESS"
                          ? `${theme.palette.primary.mainLight}!important`
                          : `${theme.palette.error.dark}!important`,
                  borderRadius: "0px",
                })}
                label={
                  status === "INSTOCK"
                    ? `${translate("INSTOCK")}`
                    : status === "ONDEMAND"
                      ? `${translate("ONDEMAND")}`
                      : status === "EXPRESS"
                        ? `${translate("EXPRESS")}`
                        : ""
                }
                color="success"
                variant="contained"
              />
            ) : (
              ""
            )}

            <Typography
              component="span"
              variant="typography14"
              fontWeight={100}
              color="common.black"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              &nbsp; {t("DeliveryDays", { from: f_day, to: t_day })}
            </Typography>
            {status == "ONDEMAND" ? (
              <>
                {langName == "ar" ? (
                  <Typography
                    component="p"
                    variant="typography14"
                    fontWeight={500}
                    color="common.black"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    &nbsp;({DayNamesAR[fDatFun.getDay()]} {fDatFun.getDate()}{" "}
                    {MonthNamesAR[fDatFun.getMonth()]} -{" "}
                    {DayNamesAR[tDatFun.getDay()]} {tDatFun.getDate()}{" "}
                    {MonthNamesAR[tDatFun.getMonth()]})
                  </Typography>
                ) : (
                  <Typography
                    component="p"
                    variant="typography14"
                    fontWeight={500}
                    color="common.black"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    &nbsp;({DayNamesEN[fDatFun.getDay()]} {fDatFun.getDate()}{" "}
                    {MonthNamesEN[fDatFun.getMonth()]} -{" "}
                    {DayNamesEN[tDatFun.getDay()]} {tDatFun.getDate()}{" "}
                    {MonthNamesEN[tDatFun.getMonth()]})
                  </Typography>
                )}
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

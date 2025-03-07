import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import { FormControl } from "@/components/form";
import RadioCheckBoxDilog from "../tabination/radioCheckBoxDilog";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { setCustomizationFun } from "@/redux/slices/customization";

const MotorPosition = ({ data }) => {


    const { t: translate } = useTranslation();
    const dispatch = useDispatch();
    const { stepsArray, editStepData } = useSelector((state) => state.customization);


    let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : false;


    const optionFun = (val) => {
        dispatch(
            setCustomizationFun(val)
        )
    }

    useEffect(() => {
        let editcheck = true;
        data.SUB_CHILD.map((elem) => {
            if (editStepData.info_result && editStepData.info_result[step_name] && editStepData.info_result[step_name]['SPS_CODE'] == elem.SPS_CODE) {
                setTimeout(optionFun(data), 1500)
                editcheck = false;
            } else if (elem.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
                elem.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(elem), 1500) : '';
            }
        })
    }, []);

    return (
        <Box>
            <Box>
                <Typography
                    sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueBold,
                        fontSize: theme.typography.typography15,
                        color: theme.palette.common.black,
                    })}
                >
                    {data && data?.SPS_DESC}
                </Typography>
            </Box>
            <FormControl fullWidth>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={data && data.SS_CODE_NAME ? data.SS_CODE_NAME : step_name}
                >
                    <Grid container justifyContent="space-between">
                        {data?.SUB_CHILD?.map((radioCheck, index) => (
                            <Grid item lg={6} md={6} sm={6} xs={12} xxs={12} key={index}>
                                <FormControlLabel
                                    sx={{
                                        width: "100%!important",
                                        marginRight: "0px!important",
                                        marginLeft: "0px",
                                    }}
                                    key={index}
                                    control={
                                        <Radio
                                            checked={
                                                stepsArray[step_name] && stepsArray[step_name]['SPS_CODE'] == radioCheck.SPS_CODE ? true : false
                                            }
                                            onChange={() => {
                                                dispatch(
                                                    setCustomizationFun(radioCheck)
                                                )
                                            }}
                                        />
                                    }
                                    label={<RadioCheckBoxDilog elem={radioCheck} />}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default MotorPosition;

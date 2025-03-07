import MuiCustomButton from "@/components/button/customButton";
import CommonDialogBox from "@/components/dialog/commonDialog";
import { SelectBox } from "@/components/form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const MoodBoardDialogBox = ({
  handleAddMoodBoard,
  setSelectMoodBoard,
  moodBoard,
  selectMoodBoard,
  handleOpenWishlistDialog,
  openWishList,
}) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <CommonDialogBox
        open={openWishList}
        titleComponent="div"
        fullWidth={true}
        maxWidth="xs"
        handleClose={() => handleOpenWishlistDialog("")}
        title={
          <>
            <Typography variant="inherit" component="p">
              {translate("CreateNewMoodBoard")}
            </Typography>
            <Typography variant="inherit" component="p">
              {translate("Addthisitemtoalist")}
            </Typography>
          </>
        }
        content={
          <Box my={2}>
            <Stack direction="row" spacing={2}>
              <SelectBox
                variant="standard"
                size="small"
                fullWidth
                value={selectMoodBoard.value}
                options={moodBoard}
                setLabel="name"
                getValue="value"
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectMoodBoard({
                      value: e.target.value,
                      option: moodBoard.find(
                        (item) => item.value === e.target.value
                      ),
                    });
                  } else {
                    setSelectMoodBoard({
                      value: null,
                      option: null,
                    });
                  }
                }}
                helperText={selectMoodBoard?.error}
              />
              <MuiCustomButton
                size="small"
                variant="contained"
                title={translate("Add")}
                onClick={() => handleAddMoodBoard()}
                loading={false}
              />
            </Stack>
          </Box>
        }
      />
    </>
  );
};

export default MoodBoardDialogBox;

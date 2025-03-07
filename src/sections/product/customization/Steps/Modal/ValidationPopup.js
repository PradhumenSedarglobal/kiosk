import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from "next-i18next";

export default function ValidationPopup(props) {
    const { t: translate } = useTranslation();
    // const router = useRouter();

    //const { stepsArray, editStepData } = useSelector((state) => state.customization);

    let validation_step = props.missingStep;
    let validation_list = Object.keys(validation_step);

    const handleClose = () => {
        props.setMissingPopup(false);
    };


    if (validation_list.length == 0) {
        return true;
    }

    return (
        <Fragment>
            <Dialog
                open={props.missingPopup}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ margin: 'auto', textAlign: 'center' }}>
                    <img className="img-fluid mb-3" src={`/assets/images/Customization/Groupn24646.png`} alt="sedarglobal" width="auto" height="auto" style={{ margin: 'auto' }} />
                    <p>{translate('Oops')} </p>
                    <p>{translate('Your_Missed_Steps')}</p>
                </DialogTitle>
                <DialogContent>

                    {validation_list.map((e, i) => {
                        let parent_step = validation_step[e]['parent_index'];
                        return (
                            <div className="error" key={i}>
                                <label htmlFor="error">{validation_step[e]['mgs'] ? validation_step[e]['mgs'] : translate(e + '_ERROR')}  &nbsp;
                                    <span onClick={() => { props.setTabChange(parent_step), props.setMissingPopup(false) }} className="edit" style={{ textDecoration: 'underline', opacity: .48, cursor: 'pointer', fontSize: '13px' }}>{translate("GotoStep")}  0{parent_step}</span>
                                </label>
                            </div>
                        )

                    })
                    }

                </DialogContent>
                <DialogActions>
                    {' '}
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}

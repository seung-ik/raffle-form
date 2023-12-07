import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { GRAY } from '@const/style';

interface Props {
  submit: () => void;
  callback?: () => void;
  isLoading: boolean;
  data: any;
  isOpen: boolean;
  setIsOpen: (_value: boolean) => void;
}

const SubmitWithDialog: React.FC<Props> = ({
  submit,
  callback,
  isLoading,
  data,
  setIsOpen,
  isOpen,
}) => {
  console.log(data);
  console.log('isLoading', isLoading);

  const handleClickOpen = () => {
    submit();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle textAlign={'center'} fontWeight={'bold'} mt={2} fontSize="24px">
          Enroll Survey
        </DialogTitle>
        <DialogContent>
          <DialogContentText mt={2} textAlign={'center'} fontSize="14px">
            Please wait until the transaction is confirmed
          </DialogContentText>
        </DialogContent>
        {data?.transactionHash && (
          <DialogContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${GRAY}`,
                borderRadius: '4px',
                padding: '12px 24px',
              }}
            >
              <div style={{ fontSize: '14px', textAlign: 'center', marginBottom: '6px' }}>
                View your transaction here
              </div>
              <div
                style={{
                  textDecoration: 'underline',
                  color: 'green',
                  cursor: 'pointer',
                  wordWrap: 'break-word',
                  fontSize: '12px',
                }}
                onClick={() =>
                  window.open(`https://sepolia.etherscan.io/tx/${data.transactionHash}`, '_blank')
                }
              >
                {data.transactionHash}
              </div>
            </div>
          </DialogContent>
        )}

        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '12px',
            }}
          >
            {!isLoading ? (
              <Button onClick={handleClose} variant="contained">
                Confirm
              </Button>
            ) : (
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Save
              </LoadingButton>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SubmitWithDialog;

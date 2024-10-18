import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert} from '@mui/material'
import { useProfile } from '../ContextApi/GobalState';
import { toast } from 'react-toastify';
export default function DraggableDialog() {
const {open,setOpen,display,setDisplay,DeleteProfile,setProfileData}=useProfile()



  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete=()=>{
    if(display){
        localStorage.removeItem("profileData")
        toast.success('User deleted from the local storage');
        setDisplay(false)
        setOpen(false);
    }
    else{
        DeleteProfile()
        setOpen(false);
        setProfileData(null)
    }
}
  return (
    <React.Fragment>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
       
        <DialogContent>
          <DialogContentText>
          <Alert severity="warning">{`Are you sure delete the profile information from ${display?"local storage":"the Api"}?`}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' size='small' variant='outlined'>
            No
          </Button>
          <Button onClick={handleDelete} color='primary' size='small' variant='outlined'>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

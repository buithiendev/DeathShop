import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '~/components/Button';
import { getUsers } from './usersSlice';
import CreateUserModal from './components/CreateUserModal';
import TableUsers from './components/TableUser';
import styles from './MainPage.module.scss';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

function MainPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const completeSubmit = () => {
        handleClose();
    };

    return (
        <div className={cx('main-page__container')}>
            <div className={cx('header')}>
                <span className={cx('title')}>List of employee</span>
                <div className={cx('feature')}>
                    <Button outline>Import</Button>
                    <Button primary onClick={handleOpen}>
                        Add new users
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <Box style={style}>
                                <CreateUserModal complete={completeSubmit} />
                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('table')}>
                    <TableUsers />
                </div>
            </div>
        </div>
    );
}

export default MainPage;

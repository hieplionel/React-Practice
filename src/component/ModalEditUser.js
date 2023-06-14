import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from 'react';
import { putUpdateUser} from "../services/UserService";
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {

    const {show, handleClose, dataUserEdit, handleEditUserFromModal } =  props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            // success
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })

            handleClose();
            toast.success("Update user succeed!")
        }
        // console.log(res);
    }

    useEffect (() => {
        if(show) {
            setName(dataUserEdit.first_name)
        }

    }, [dataUserEdit]);
    

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Edit A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="form-group">
                                <label >Name:</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter Name" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label >Job:</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter Job"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                                />
                            </div>
                            
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;


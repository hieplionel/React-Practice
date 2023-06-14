import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';
import {postCreateUser} from "../services/UserService"
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {

    const {show, handleClose, handleUpdateTable} =  props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        // console.log("check res:" , res)

        if( res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success("A user is created successfully!");
            handleUpdateTable({first_name: name, id: res.id});
            //success
        } else {
            toast.error("An error...!")
            //error
        }
    } 

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
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
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;


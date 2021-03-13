import React from "react";

import './JobApplicationModal.css'

const Modal = (props) => {
    const showHideClassName = props.show ? "modal" : "modal d-none";

    if(props.show) {
        return (
            <div className={showHideClassName}>
                <div className="modal-container">
                    <div className="modal-heading-container">
                            <div className="modal-heading">
                                Add Job Application
                            </div>
                            <div className="modal-heading-close-btn">
                                <button className="btn-close modal-close-btn " type="button" aria-label="Close" onClick={props.handleClose}></button>
                            </div>
                    </div>
                    <div className="modal-flex-container ">
                        <div className="modal-flex-item">
                            <div>
                                <input type="text" className="modal-input" id="addAppCompanyName" placeholder="Company Name" size="30" required/>
                            </div>
                            <div>
                                <input type="text" className="modal-input" id="addAppAppliedDate" placeholder="Applied Date" size="30" required/>    
                            </div>
                            <div>
                                <input type="text" className="modal-input" id="addAppAppliedDate" placeholder="Application Tracking System" size="30" required/>    
                            </div>
                            <div>
                                <textarea type="textarea" className="modal-input" id="addAppAppliedDate" placeholder="Notes" cols="29" rows="5" required/>    
                            </div>
                            {/* <div>
                                <input type="file" className="modal-input" class="form-control" id="customFile" />
                            </div> */}
                            <div>
                                <h5><span className="badge badge-info">Application Status: {props.jobStatus.name}</span></h5>
                            </div>
                        </div>
                        <div className="modal-flex-item">
                            <div>
                                <input type="text" className="modal-input" id="addAppAppliedDate" placeholder="jobTitle" size="30" required/>    
                            </div>
                            <div>
                                <textarea type="textarea" className="modal-input" id="addAppAppliedDate" placeholder="Description" cols="29" rows="10" required/>    
                            </div>
                        </div>

                        
                    </div>
                    <div>
                        <span href="" className="modal-close btn btn-primary modal-button" onClick={props.handleSave}> Save </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }
};

export default Modal;
import React from 'react';
import successGif from '../../../../assets/success_icon.gif';
import { Button } from 'react-bootstrap';

const SuccessPage = (props) => {
    return (
        <div className='mt-25' style={{ border: "1px solid silver", height: "40vh", borderRadius: "7px", maxWidth: '50%', margin: 'auto' }}>
            <div className="mt-4 text-center">
                <img src={successGif} alt="Animated GIF" />
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>
                        Invested Successfully !
                    </h4>
                </div>
            </div>
            <div className='mb-3 d-flex justify-content-center mt-3'>
                <Button onClick={() => props.history.push("/opportunities/new/read-offering")} className='mt-4'>
                    BACK
                </Button>
            </div>
        </div>
    )
}

export default SuccessPage;
import React, { useEffect, useRef, useState } from 'react';
import "./CreateShop.css";
import toast from 'react-hot-toast';

const CreateShop = () => {
    const [tempImg, setTempImg] = useState(null);
    const profileImgRef = useRef();
    const [allDivisions, setAllDivisions] = useState([]);
    useEffect(() => {
        fetch('https://bdapis.com/api/v1.1/divisions')
            .then(res => res.json())
            .then(data => {
                setAllDivisions(data.data)
            })
    }, [])

    const handleProfileImgChange = (e) => {
        setTempImg(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        const form = e.target;
        const shopName = form.shopName.value;
        const businessRegistration = form.businessRegistration.value;
        const TIN = form.TIN.value;
        const eTIN = form.e - TIN.value;
        const warehouse = form.warehouse.value;
        if(warehouse==='default'){
            toast.error("Select a warehouse");
            return;
        }
        form.reset();
        profileImgRef.current=null;
    }


    return (
        <div className='modal fade' id='CreateShop' data-bs-keyboard="false" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{ borderBottom: "0px" }}>
                        <button className='btn btn-close' data-bs-dismiss="modal" ></button>
                    </div>
                    <div className="modal-body">
                        <form className='form' id='createShopForm' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="shopName">Shop Name:</label>
                                <div className='input-label'>
                                    <input type="text" className='form-control' name='shopName' id='shopName' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor='businessRegistration'>Business Registration Number: </label>
                                <div className='input-group'>
                                    <input type="text" name='businessRegistration' id="businessRegistration" className='form-control' />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor='TIN'>Tax Index Number(TIN): </label>
                                <div className='input-group'>
                                    <input type="text" name='TIN' id="TIN" className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor='vatNumber'>VAT Registration Number: </label>
                                <div className='input-group'>
                                    <input type="text" name='vatNumber' id="vatNumber" className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor='e-TIN'>e-TIN: </label>
                                <div className='input-group'>
                                    <input type="text" name='e-TIN' id="e-TIN" className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-3'>
                                {
                                    tempImg ? <div className='d-flex justify-content-center' style={{ height: "100px", width: "100%" }}>
                                        <img src={tempImg} alt="" className='img-fluid' height={"100%"} width={"auto"} />
                                    </div> : <><div className='shopFirstImg' onClick={() => document.querySelector('#shopFirstProfileImg').click()}>
                                        <i className='bi bi-plus fs-2 text-primary'></i>
                                    </div>
                                        <input type="file" name='shopFirstProfileImg' id='shopFirstProfileImg' hidden onChange={handleProfileImgChange} ref={profileImgRef} />
                                    </>
                                }

                            </div>
                            <div className='mt-3'>
                                <label htmlFor="warehouse">Warehouses:</label>
                                <div className="input-group">
                                    <select name="warehouse" id="warehouse" className='form-select' defaultValue={'default'}>
                                        <option value="default">Select division</option>
                                        {
                                            allDivisions.map((item, index) => <option value={item.division} key={index}>{item.division}</option>)
                                        }
                                    </select>

                                </div>
                            </div>
                            <div className='mt-3 d-flex justify-content-center'>
                                <button className='btn btn-success' data-bs-dismiss="modal">Create Shop</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateShop;
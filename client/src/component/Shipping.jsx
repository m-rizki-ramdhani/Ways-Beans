import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";


export default function Shipping(props) {
   
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };

            const formData = new FormData();
            formData.set('name', form.name);
            formData.set('email', form.email);
            formData.set('phone', form.phone);
            formData.set('address', form.address);

            let formDataObject = {};
            for (const [key, value] of formData.entries()) {
                formDataObject[key] = value;
            }
            const formDataJSON = JSON.stringify(formDataObject);
            const response = await API.post('/transaction', formDataJSON, config);
            console.log("success shipping: ",response.data.data.token);
            const token = response.data.data.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    window.dispatchEvent(new Event("badge"));
                    props.handleSuccess();
                },
                onPending: function (result){
                    console.log(result);
                    window.dispatchEvent(new Event("badge"));
                    props.handleSuccess();
                },
                onError: function (result){
                    console.log(result);
                    window.dispatchEvent(new Event("badge"));
                    props.handleSuccess();
                },
                onClose: function(){
                    alert("you closed the popup without finishing the payment");
                }
            })
            
        } catch (error) {
            console.log("transaction failed: ", error)
        }
    });

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <>
            <Container>
            <h2 style={{ color: "#613D2B" }} className="d-flex fw-bold mb-4 mt-1 justify-content-center">Shipping Address</h2>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Control
                        onChange={handleChange}
                        name="name"
                        type="text"
                        placeholder="Name"
                        style={{
                            border: "1px solid #613D2B",
                            backgroundColor: "#F6E6DA",
                          }}
                        className="mb-3"
                    />
                    <Form.Control
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Email"
                        style={{
                            border: "1px solid #613D2B",
                            backgroundColor: "#F6E6DA",
                          }}
                        className="mb-3"
                    />
                    <Form.Control
                        onChange={handleChange}
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        style={{
                            border: "1px solid #613D2B",
                            backgroundColor: "#F6E6DA",
                          }}
                        className="mb-3"
                    />
                    <Form.Control
                        onChange={handleChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                        style={{
                            border: "1px solid #613D2B",
                            backgroundColor: "#F6E6DA",
                          }}
                        className="mb-3"
                    />
                    <div className="d-grid mb-3">
                    <Button style={{ backgroundColor: "#613D2B", border: "none" }} type="submit">Confirm</Button>
                    </div>
                </Form>
            </Container>

           
        </>
    )
}
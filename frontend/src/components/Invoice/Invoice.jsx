import Metadata from "../layouts/Metadata"
import "./invoice.css";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';


const Invoice = () => {
    const params = useParams();
    const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
    const order = data?.order || {};

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalAmount,
        itemsPrice,
        taxAmount,
        shippingAmount
    } = order;


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error]);

    // download invoice
    const handleDownload = async () => {
        const invoiceDOM = document.getElementById("order_invoice");
        const invoiceCanvas = await html2canvas(invoiceDOM, {scale : 2});
        const imgData = invoiceCanvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0);
        pdf.save(`invoice#${order._id}`);
    }



    if (isLoading)
        return <Loader />



    return (
        <>
            <Metadata title="Order Invoice" />
            <div className="order-invoice my-5">
                <div className="row d-flex justify-content-center mb-5">
                    <button className="btn btn-success col-md-5" onClick={handleDownload}>
                        <i className="fa fa-print"></i>
                        Download Invoice
                    </button>
                </div>
                <div id="order_invoice" className="p-3 border border-secondary">
                    <header className="clearfix">
                        <div id="logo">
                            <img src="/images/shopLogo2.webp" alt="Company Logo" />
                        </div>
                        <h1>INVOICE # {order?._id}</h1>
                        <div id="company" className="clearfix">
                            <div>ShopCart</div>
                            <div>
                                101 Gateway Towers,<br />
                                Bandra Kurla Complex,<br />
                                Mumbai, Maharashtra 400051, India
                            </div>
                            <div>(+91) 9923456789</div>
                            <div>
                                <a href="mailto:info@shopcart.in">info@shopcart.in</a>
                            </div>
                        </div>
                        <div id="project">
                            <div><span>Name</span> {user?.name}</div>
                            <div><span>EMAIL</span> {user?.email}</div>
                            <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
                            <div>
                                <span>ADDRESS</span>
                                {shippingInfo?.address + ", " + shippingInfo?.city + ", " + shippingInfo?.state + " - " + + shippingInfo?.zipCode + ", " + shippingInfo?.country}
                            </div>
                            <div><span>DATE</span> {new Date(order?.createdAt).toLocaleString("en-US")}</div>
                            <div><span>Status</span> {paymentInfo?.status}</div>
                        </div>
                    </header>
                    <main>
                        <table className="mt-5">
                            <thead>
                                <tr>
                                    <th className="service">ID</th>
                                    <th className="desc">NAME</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    orderItems?.map((item) => {
                                        return (
                                            <tr key={item?._id}>
                                                <td className="service">{item?._id}</td>
                                                <td className="desc">{item?.name}</td>
                                                <td className="unit">₹ {item?.price}</td>
                                                <td className="qty">{item?.quantity}</td>
                                                <td className="total">₹ {item?.quantity * item?.price}</td>
                                            </tr>
                                        )
                                    })
                                }


                                <tr>
                                    <td colSpan="4">
                                        <b>SUBTOTAL</b>
                                    </td>
                                    <td className="total">₹ {itemsPrice}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4">
                                        <b>TAX 15%</b>
                                    </td>
                                    <td className="total">₹ {taxAmount}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4">
                                        <b>SHIPPING</b>
                                    </td>
                                    <td className="total">₹ {shippingAmount}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4" className="grand total">
                                        <b>GRAND TOTAL</b>
                                    </td>
                                    <td className="grand total">₹ {totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>

                    </main>
                    <footer>
                        Invoice was created on a computer and is valid without the signature.
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Invoice
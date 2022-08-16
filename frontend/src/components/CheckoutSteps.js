const CheckoutSteps = (props) => {
    return (
        <div className="row checkout-steps">
            <div className={`col text-center pb-2 ${props.step1 && 'active'}`}>
                Sign In
            </div>
            <div className={`col text-center pb-2 ${props.step2 && 'active'}`}>
                Shipping
            </div>
            <div className={`col text-center pb-2 ${props.step3 && 'active'}`}>
                Payment
            </div>
            <div className={`col text-center pb-2 ${props.step4 && 'active'}`}>
                Place Order
            </div>
        </div>
    );
};

export default CheckoutSteps;

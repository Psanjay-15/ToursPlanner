interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Razorpay: new (options: any) => {
    on(arg0: string, arg1: (response: { razorpay_payment_id: string | undefined; razorpay_order_id: string | undefined; razorpay_signature: string | undefined; }) => void): unknown; open: () => void 
}; 
}
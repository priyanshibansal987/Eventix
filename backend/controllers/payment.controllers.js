const initiatePayment = async ({ userId, eventId, amount, quantity }) => {
  // For now we return a placeholder.
  return {
    paymentId: null,
    status: "pending",
  };
};

export { initiatePayment };


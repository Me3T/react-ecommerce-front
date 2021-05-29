import axios from "axios";

export const getCoupans = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupans`);

export const removeCoupan = async (coupanId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupan/${coupanId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupan = async (coupan, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupan`,
    { coupan },
    {
      headers: {
        authtoken,
      },
    }
  );

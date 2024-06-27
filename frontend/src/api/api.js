

import axios from 'axios';

export const fetchSubscription = async (ani, active) => {
  try {
    const res = await axios.get(`/api/subscription/redirect?msisdn=${ani}&result=${active}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBanners = async (selectedSubcategory) => {
  try {
    const response = await axios.get(`/api/banner/${selectedSubcategory}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

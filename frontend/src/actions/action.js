// actions.js

import { fetchSubscription, fetchBanners } from '../api/api'
import { setSubscriptionData, setBanners, setLoading } from '../slices/bannerSlice'

export const fetchSubscriptionData = (ani, active) => async (dispatch) => {
  try {
    const res = await fetchSubscription(ani, active);
    dispatch(setSubscriptionData(res));
    const selectedSubcategory = res[0].category_name;
    dispatch(fetchBannerData(selectedSubcategory));
  } catch (error) {
    console.error('Error fetching subscription:', error);
  }
};

export const fetchBannerData = (subcategory) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchBanners(subcategory);
    dispatch(setBanners(response));
  } catch (error) {
    console.error('Error fetching banners:', error);
    dispatch(setLoading(false));
  }
};

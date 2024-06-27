import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import DataCarousel from './DataCarousel';
import Loader from './Loader';
import { baseUrl } from '../data/data';

const Carousel = ({ ani, service }) => {
  const [banner, setBanner] = useState([]);
  const [categoryname, setSubCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log("caro", service)
  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/subscription/redirect?msisdn=${ani}&service=${service}&result=active`);
      setSubCategoryName(res.data[0].category_name);
    
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [ani]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      console.log("===categoryname",categoryname)
      const response = await axios.get(`/api/banner/${categoryname}`);
      setBanner(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryname) {
      fetchBanners();
    }
  }, [categoryname]);

  return (
    <div>
      {loading ? <Loader service={service} /> : <DataCarousel banner={banner} />}
    </div>
  );
};

export default Carousel;

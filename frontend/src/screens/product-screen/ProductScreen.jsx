import React from 'react';
import  {useParams} from 'react-router-dom';
import useApi from '../../utils/customHooks';
import {  CircularProgress } from "@mui/material";
import {MdError} from 'react-icons/md';

export default function ProductScreen() {
  const {slug} = useParams();
  const { loading, error, data } = useApi(`/api/products/slug/${slug}`,slug);

   

  return    (
    
      loading ? <CircularProgress />
  :   error ? <MdError/> 
  : (<div>
    <h1>{data.name}</h1>
  </div>
)

    
    
  )
}

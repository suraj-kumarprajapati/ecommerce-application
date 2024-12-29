

import React from 'react';
import { Helmet } from 'react-helmet';



function  Metadata({title})  {
  return (
    <Helmet>
        <title> {`ShopCart -  ${title}` } </title>
    </Helmet>
  )
}

export default Metadata
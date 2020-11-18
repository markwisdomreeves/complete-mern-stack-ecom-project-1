import React from 'react';
import Loader from 'react-loader-spinner';


class Loading extends React.Component {
   
    render() {
     return(
      <div style={{display: "flex", justifyContent: "center", textAlign: "center", marginTop: "40px"}}>
        <Loader
         type="ThreeDots"
         color="#00BFFF"
         height={70}
         width={70}
         timeout={500000}
      />
      </div>
     );
    }
}


export default Loading;

import { css } from '@emotion/react';
import React, { useState } from 'react'
import { RingLoader } from 'react-spinners';

function Loader() {
    let [loading, setLoading] = useState(true);
    const override = css`
    display: "block",
  margin: "0 auto",
  borderColor: "red",`
        ;

    return (
        <div className='center-container'>
            <div>
                <RingLoader
                    color='green'
                    loading={loading}
                    css={override}
                    size={80}
                />
            </div>
        </div>

    )
}

export default Loader
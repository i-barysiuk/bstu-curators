import React from 'react';
import {Button} from 'antd' ; 
import 'antd/dist/antd.css'; 

function But() 
{
    return (
        <div>
           <ul> 
            <li><Button type="primary">Primary</Button></li>
            <li><Button>Default</Button></li>
            <li><Button type="dashed">Dashed</Button></li>
            <li><Button type="danger">Danger</Button></li>
            <li><Button type="link">Link</Button></li>
        </ul>
      </div>
    );
}

export default But;
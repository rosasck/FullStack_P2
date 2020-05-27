import React, {Component} from 'react'
import Card from "../cards"
import { render } from 'react-dom';

class Cards extends Component{

render(){
    return(
<div className='container-fluid d-flex justify-content-center'>
    <div className="row">
        <div className='col-md-4'>
            <Card title="pet1" desc="hey"imgsrc={"https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg"} />
        </div>
        <div className='col-md-4'>
            <Card title="Pet2" desc="hello this is 2nd one " imgsrc={"https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg"}/>
        </div>
        <div className='col-md-4'>
            <Card title="pet3" desc="Lorem ipsummmmmm"   imgsrc={"https://cdn.clipart.email/dd7ca471f7af2bb0f501a464970b2b1b_kawaii-cute-cat-face-drawing-cuteanimals_360-360.jpeg"}/>
        </div>
    </div>
</div>

    );

}
}

export default Cards;
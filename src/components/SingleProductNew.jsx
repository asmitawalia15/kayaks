import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
class SingleProductNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
          kayaks: '',
          single: false,
          kayakid:'',
          singlekayak_id:'',
          singlepostimage:'',
          singlepostname:'',
          singlepostdescription:'',
          singlepostcolour:'',
          singlepostmanufacturer:'',
          singlepostprice:'',
          singlepostseats:'',
          singlepostweight:'',
          singlepostendingDateAvailable:'',
          singlepoststartingDateAvailable:''
        }
      }
    componentDidMount() {
        const kayakid = this.props.match.params.id;
        this.setState({kayakid:kayakid})
        console.log(kayakid)
        let request;
        request = {
            method: 'GET',
            url: `http://localhost:4000/Products/${kayakid}`,
            headers: { 'Content-Type': 'application/json'},
        };
        axios(request).then((response) => {
         
          console.log(response.data)
            this.setState({
              singlekayak_id:response.data._id,
              singlepostimage:response.data.image,
              singlepostname:response.data.name,
              singlepostdescription:response.data.description,
              singlepostcolour:response.data.colour,
              singlepostmanufacturer:response.data.manufacturer,
              singlepostprice:response.data.price,
              singlepostseats:response.data.seats,
              singlepostweight:response.data.weight,
              singlepostendingDateAvailable:response.data.endingDateAvailable,
              singlepoststartingDateAvailable:response.data.startingDateAvailable
            });
        })
      } 
      DeleteProduct=(e,kayakid)=>{
        swal({
            title: "Are you sure to Completly Delete this Product?",
            buttons: ["Cancel", "Yes"],
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
        const request = new Request(`http://localhost:4000/Products/${kayakid}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
            })
        });
        return fetch(request)
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
                if(data.message == 'Deleted Item'){
                    swal("Done", 'Deleted Successfully', "success");
                    this.props.history.push('/')
                }else{
                    swal("Oops!", 'Error.. please try again', "error");
                }
            })
            .catch(err => {
            });
        } 
    });

      }
    render() {
        const {single,kayakid,singlekayak_id,singlepostimage, singlepostname, singlepostdescription,singlepostcolour,
            singlepostmanufacturer,
            singlepostprice,
            singlepostseats,
            singlepostweight,
            singlepostendingDateAvailable,
            singlepoststartingDateAvailable} = this.state
        return (
            <>
                        <div class="row">
                        <div className='mainheading'><h1>{singlepostname}</h1></div>
                        <button className='deleteBtn' onClick={(e)=>this.DeleteProduct(e,kayakid)}>DELETE</button>
                        <a className='updateBtn' href={`/update-product/${kayakid}`}>UPDATE</a>

                            <div className="list_with_thumbnails">
                          <ul className="main_list img-list">
                            <li className="main_item">
                              <div className="main_item-image">
                                <img className="main_thumbnail" src={`http://localhost:4000/Products/images/${singlepostimage}`} alt="Image Alt Text" />
                              </div>
                              <div className="main_item-text">
                                <h4 className="main_heading">{singlepostname}</h4>
                                <p className="main_description">{singlepostdescription}</p>
                                <p className="main_description">COLOR: {singlepostcolour}</p>
                                <p className="main_description">MANUFACTURER: {singlepostmanufacturer}</p>
                                <p className="main_description">PRICE: {singlepostprice}</p>
                                <p className="main_description">NO. OF SEATS: {singlepostseats}</p>
                                <p className="main_description">WEIGHT: {singlepostweight}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        </div>
                    
            </>
        );
    }
}

export default SingleProductNew;
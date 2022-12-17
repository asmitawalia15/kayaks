import React, { Component } from 'react';
import axios from 'axios';
class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          kayaks: '',
          single: false,
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
        console.log(kayakid)
        this.setState({kayakid:kayakid})
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
      validateeventForm = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        e.preventDefault();
    }

      updateProduct=(e)=>{
        const{kayakid} = this.state;
        const {single,singlekayak_id,singlepostimage, singlepostname, singlepostdescription,singlepostcolour,
            singlepostmanufacturer,
            singlepostprice,
            singlepostseats,
            singlepostweight,
            singlepostendingDateAvailable,
            singlepoststartingDateAvailable} = this.state
        let request;
        let formData = new FormData();
        formData.append('name', singlepostname);
        formData.append('price', singlepostprice);
        formData.append('colour', singlepostcolour);
        formData.append('manufacturer', singlepostmanufacturer);
        formData.append('description', singlepostdescription);
        formData.append('seats', singlepostseats);
        formData.append('weight', singlepostweight);
        request = {
            method: 'POST',
            url: `http://localhost:4000/Products/${kayakid}`,
            headers: { 'Content-Type': 'application/json'},
            data: formData
        };
        axios(request).then((data) => {
           console.log(data)
        });

      }
    render() {
        const {single,singlekayak_id,singlepostimage, singlepostname, singlepostdescription,singlepostcolour,
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
                            <div className="list_with_thumbnails">
                          <ul className="main_list img-list">
                            <li className="main_item">
                              <div className="main_item-image">
                                <img className="main_thumbnail" src={`http://localhost:4000/Products/images/${singlepostimage}`} alt="Image Alt Text" />
                              </div>
                              <div className="main_item-text">
                                {/* <h4 className="main_heading">{singlepostname}</h4>
                                <p className="main_description">{singlepostdescription}</p>
                                <p className="main_description">COLOR: {singlepostcolour}</p>
                                <p className="main_description">MANUFACTURER: {singlepostmanufacturer}</p>
                                <p className="main_description">PRICE: {singlepostprice}</p>
                                <p className="main_description">NO. OF SEATS: {singlepostseats}</p>
                                <p className="main_description">WEIGHT: {singlepostweight}</p>
                                <input name="singlepostname" value={singlepostname} /> */}
                                <div className="editablefields">
                                    <label>Title</label>
                                    <input className="form-control" type="text" name="singlepostname" value={this.state.singlepostname} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <div className="editablefields">
                                    <label>Description</label>
                                    <input className="form-control" type="text" name="singlepostdescription" value={this.state.singlepostdescription} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <div className="editablefields">
                                    <label>COLOR</label>
                                    <input className="form-control" type="text" name="singlepostcolour" value={this.state.singlepostcolour} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <div className="editablefields">
                                    <label>MANUFACTURER</label>
                                    <input className="form-control" type="text" name="singlepostmanufacturer" value={this.state.singlepostmanufacturer} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <div className="editablefields">
                                    <label>PRICE</label>
                                    <input className="form-control" type="text" name="singlepostprice" value={this.state.singlepostprice} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <div className="editablefields">
                                    <label>NO. OF SEATS</label>
                                    <input className="form-control" type="text" name="singlepostseats" value={this.state.singlepostseats} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <div className="editablefields">
                                    <label>WEIGHT</label>
                                    <input className="form-control" type="text" name="singlepostweight" value={this.state.singlepostweight} onChange={e => this.validateeventForm(e)} />
                                </div>
                                <a className='updateBtn' onClick={(e)=>this.updateProduct(e)}>UPDATE</a>

                              </div>
                            </li>
                          </ul>
                        </div>
                        </div>
                    
            </>
        );
    }
}

export default UpdateProduct;
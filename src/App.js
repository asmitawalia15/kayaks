import React, { Fragment, Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SingleProduct from './components/SingleProduct';
import NewHome from './NewHome';
import axios from 'axios';
class App extends Component {
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
    let request;
    request = {
      method: 'GET',
      url: `http://localhost:4000/Products`,
      headers: { 'Content-Type': 'application/json' },
    };
    axios(request).then((response) => {
      console.log(response.data)
      this.setState({
        kayaks: response.data,
      });
    })
      .catch((error) => {
      });
  }
  getSingleKayak =(e,kayakid)=>{
    this.setState({
      single: true,
      singlekayak_id:kayakid
    });
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
  render() {
    const {single,singlekayak_id,singlepostimage, singlepostname, singlepostdescription,singlepostcolour,
    singlepostmanufacturer,
    singlepostprice,
    singlepostseats,
    singlepostweight,
    singlepostendingDateAvailable,
    singlepoststartingDateAvailable} = this.state
    return (

      <div className="wrapper">
       <a href="/"> <h1>All Kayaks</h1></a>
        {
          !single?
          <div className="list_with_thumbnails">
          <ul className="list img-list">
            {
              this.state.kayaks ? this.state.kayaks.length > 0 ? this.state.kayaks.map((post) => (
                <a onClick={(e) => this.getSingleKayak(e,post._id)} href="#modal-container-56324199342" role="button" data-toggle="modal">
                  <li className="item">
                    <div className="item-image">
                      <img className="thumbnail" src={`http://localhost:4000/Products/images/${post.image}`} alt="Image Alt Text" />
                    </div>
                    <div className="item-text">
                      <h4 className="heading">{post.name}</h4>
                      <p className="description">{post.description}</p>
                    </div>
                  </li>
                </a>
              )) : 'No Kayaks' : ''
            }
          </ul>
        </div>
        :
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
                      
                      <p className="main_description">NO. OF SEATS{singlepostseats}</p>
                      <p className="main_description">WEIGHT{singlepostweight}</p>
                    </div>
                  </li>
              
          </ul>
        </div>
        }
        
        <BrowserRouter basename='fe'>
          {/* <Routes> */}
          <Route exact path='/' element={Home} />
          <Route path="/beach" render={() => <SingleProduct />} />
          <Route path='/yolo' element={NewHome} />
          <Route path="/rrrr" component={NewHome} />
          <Route path="/yyyy" component={SingleProduct} />
          <Route path="/single" element={<SingleProduct />} />
          {/* </Routes> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

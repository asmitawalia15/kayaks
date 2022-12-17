import React from 'react'  
import axios from 'axios';
import Pagination from '../Pagination';
class Homenew extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
          kayaks: '',
          totalItems:'',
          pageOfItems: [],
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
            totalItems:response.data
          });
        })
          .catch((error) => {
          });
      }
      onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }
 
  render() { 
    const {single,singlekayak_id,singlepostimage, singlepostname, singlepostdescription,singlepostcolour,
        singlepostmanufacturer,
        singlepostprice,
        singlepostseats,
        singlepostweight,
        singlepostendingDateAvailable,
        singlepoststartingDateAvailable} = this.state
      console.log(window.location.hash); 
    return (
      <>

<div class="banner influencers thank-banner pb-0 pt-4" id="thank-banner">

<div className="thankyou">

  <div class="row">
    <div className="col-md-12">
    <div className='mainheading'><h1>All Kayaks</h1></div>
    &nbsp;{this.state.totalItems.length > 0 ? <Pagination items={this.state.totalItems} onChangePage={this.onChangePage} /> : ''}

    <div className="list_with_thumbnails">
        <ul className="list img-list">
          {
            this.state.totalItems ? this.state.totalItems.length > 0 ? this.state.pageOfItems.map((post) => (
                <li className="item">
                                <a className='listkayak' href={`/single/${post._id}`} onClick={(e) => this.getSingleKayak(e,post._id)} role="button">

                  <div className="item-image">
                    <img className="thumbnail" src={`http://localhost:4000/Products/images/${post.image}`} alt="Image Alt Text" />
                  </div>
                  <div className="item-text">
                    <h4 className="heading">{post.name}</h4>
                    <p className="description">{post.description}</p>
                  </div>
              </a>
                </li>
            )) : 'No Kayaks' : ''
          }
        </ul>
      </div>
      &nbsp;{this.state.totalItems.length > 0 ? <Pagination items={this.state.totalItems} onChangePage={this.onChangePage} /> : ''}


    </div>
  </div>
  </div>
</div>

  </>
  );
  }  
}  
export default Homenew  
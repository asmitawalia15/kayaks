import React, { Component } from 'react';

class InnerLayout extends Component {
  
    render() {
        return (
            <>
                    <div className="main_container">
                        <div className="page_content">
                            <div className="main-content w-100 text-center">
                                <div className="">
                                    <div className="sec games-list">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        );
    }
}

export default InnerLayout;

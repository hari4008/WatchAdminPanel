import React from 'react';

const error404 = () => {
    return (
        <div>
            <section style={{ padding: '40px 0', background: '#fff', fontFamily: 'Arvo, serif' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1 text-center">
                                <div style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)', height: '400px', backgroundPosition: 'center' }}>
                                    <h1 className="text-center" style={{ fontSize: '80px' }}>404</h1>
                                </div>

                                <div className="contant_box_404" style={{ marginTop: '-50px' }}>
                                    <h3 className="h2" style={{ fontSize: '30px' }}>Look like you&apos;re lost</h3>
                                    <p>the page you are looking for is not available!</p>
                                    <a href="/" className="link_404" style={{ color: '#fff', padding: '10px 10px', background: 'linear-gradient(90deg, rgb(255, 186, 0) 0%, rgb(255, 108, 0) 100%)', margin: '20px 0', display: 'inline-block' }}>Go to Home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default error404;

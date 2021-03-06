import React ,{useState,useEffect,Component}from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Image from 'next/image'
import {getProfilesName,getProfileData} from '../../lib/user'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import { googleapikey } from '../api/api'



class index extends Component {

    state={

        mapStyles : {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position:'relative'
        },
        location : this.props.data.profile.user_location && JSON.parse(`${this.props.data.profile.user_location}`),
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
     });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    render() {
        console.log(this.state.location)
        return (
            <div className="members-profile">
                    <Head>
                        <title>A recruit | {this.props.data.profile.user_name +" "+this.props.data.profile.user_firstname}</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Header
                    />
                    
                    <main className="body">
                        <div className="head">
                            <div className="top">
                                <div className="info orientationV">
                                   
                                    <div>
                                        <div className='item'>{this.props.data.profile.user_name+" "+this.props.data.profile.user_firstname}    </div>
                                        <div className='item'>{this.props.data.profile.user_profession}</div>
                                        <div className="post">{this.props.data.profile.user_post}</div>
                                    </div>
                                    <div className="profile-image-container">
                                        <Image alt="profile" src="/images/icon_defaultUser.png" width={100} height={100}/>
                                    </div>
                                  
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="wave" version="1.1"  width="100%" height="50" preserveAspectRatio="none" viewBox="0 0 1440 50">
                                    <g mask="url(&quot;#SvgjsMask1022&quot;)" fill="none">
                                        <path d="M 0,8 C 36,16.4 108,48.2 180,50 C 252,51.8 288,21 360,17 C 432,13 468,32.6 540,30 C 612,27.4 648,4.2 720,4 C 792,3.8 828,26.4 900,29 C 972,31.6 1008,17 1080,17 C 1152,17 1188,28 1260,29 C 1332,30 1404,23.4 1440,22L1440 50L0 50z" fill="#fff"></path>
                                    </g>
                                    <defs>
                                        <mask id="SvgjsMask1022">
                                            <rect width="1440" height="50" fill="#ffffff"></rect>
                                        </mask>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="center">
                            <br></br>
                            <br></br>
                            <div className="btn">
                                Contacter
                            </div>
                        </div>
                        <div className="w90">
                           
                            <span>Mon profile</span>
                            <br></br>
                            <br></br>
                        </div>
                        <div className="w90 bottom">
                          
                            <div className="profil-info">
                                <div className="profil-info-item icon_info">
                                    <div>{this.props.data.profile.user_country}</div>  
                                    <div>{this.props.data.profile.user_address+" "+this.props.data.profile.user_zip_code+" "+this.props.data.profile.user_city+" "+this.props.data.profile.user_department}</div>  
                                    <div>{this.props.data.profile.user_phone_number}</div>  
                                    <div>{this.props.data.profile.user_email}</div>  
                                </div>
                                <div className="profil-info-item icon_presentation">
                                    Lorem commodo in id eiusmod dolore. Nisi aute non nisi laboris veniam tempor excepteur aliqua ipsum laborum deserunt reprehenderit. Excepteur quis dolore proident enim exercitation esse cillum. Aute commodo magna est ex adipisicing reprehenderit culpa mollit exercitation esse pariatur adipisicing aliqua. Magna nulla consectetur culpa reprehenderit nulla do id laborum. Sunt quis magna voluptate aute adipisicing aliquip sint excepteur amet enim voluptate voluptate cillum. Laboris non officia proident consequat culpa laboris laborum.
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="maps">
                            <Map
                                google={this.props.google}
                                zoom={14}
                                style={this.state.mapStyles}
                                initialCenter={this.state.location.pos}
                            >
                                <Marker
                                    onClick={this.onMarkerClick}
                                    name={this.props.data.profile.user_address}
                                />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                >
                                    <div>
                                        <h4>{this.state.selectedPlace.name}</h4>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </div>
                        <br></br>
                        <br></br>
                    </main>

                    <Footer/>

            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: googleapikey
})(index);

export async function getStaticPaths() {
    
    const paths = await getProfilesName()
    return {
            paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {

    const data = await getProfileData(params.id)

    return {
      props: {
        data
      }
    }
}


import React, {Component}from 'react';

class Album extends Component {
    render(){

        const {link, title, image, release_date} = this.props.item;

        return(
          <div className='album'>
            <a href={link} target='_blank' rel='noopener noreferrer'>
                <div className="cover"><img src={image} alt={title}></img></div>
                <div className='title'><h2>{title}</h2></div>
                <div className='release-date'>{release_date}</div>
            </a>
          </div>
        )
    }
}

export default Album;
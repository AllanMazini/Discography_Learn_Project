import React, {Component} from 'react';
import Album from './Album';
import './Discography.css';

class Discography extends Component {
  
  constructor(props){
    super(props);

    this.state = {data : [] };
  };

  componentDidMount(){
    const discographyURL = 'https://gist.githubusercontent.com/emersonbrogadev/74da958938b36ee5baf14a08a81aa337/raw/f5feaf78dd4a95b73d0e4cc38f23f59ab35f3c42/albums.json'

    fetch(discographyURL)
      .then(result => result.json())
      .then((result) => {
        this.setState({data : result.data || []})
      })
      .catch((err) => {
        console.error(err)
      });

  }

  render(){
    const {data} = this.state;

    if (!data || !data.length) {return (<h2>Loding ...</h2>)}
    return(
      <div>
        <h2>Discography</h2>
        <div className='discography'>
        {/* USANDO CHAVE COMPOSTA - | cria uma "const key = `${index} - ${album.title}`"  */}
        {data.map(album => <Album key={album.title} item={album}/> )}
        </div>
      </div>)
  }
}

export default Discography;


import React, {Component} from 'react';
import Album from './Album';
import './Discography.css';

class Discography extends Component {
  
  constructor(props){
    super(props);

    this.state = { data: [], filter: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
//Formulario de pesquisa
  handleChange(event) {
    const filter = event.target.value;
    this.setState({ filter });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);

    this.setState({ filter: data.q });
  }

  applyFilter(data, filter) {
    if (!filter) return data;
    const lowerFilter = filter.toLowerCase();

    return data.filter(item => {
      const lowerTitle = item.title.toLowerCase();
      return lowerTitle.indexOf(lowerFilter) !== -1;
    });
  }
  render(){
    const { data, filter } = this.state;

    if (!data || !data.length) return (<h2>Loading...</h2>);

    const filteredData = this.applyFilter(data, filter);

    return (
      <div>
        <h2>Discography</h2>
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="q" className="input" autoComplete="off" onChange={this.handleChange} />
            <input type="submit" className="btn" value="Search" />
          </form>
        </div>

        <div className="discography">
          {filteredData.map(album => <Album key={album.title} item={album} />)}
        </div>
      </div>
    )
    }
  }

export default Discography;


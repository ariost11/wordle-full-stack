import * as React from 'react';

export default class Box extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id='letter'>
        {this.props.color == null && this.props.letter == null && <p className='text' id='not-submitted'>&zwnj;</p>}
        {this.props.color == null && this.props.letter != null && <p className='text' id='not-submitted'>{this.props.letter}</p>}
        {this.props.color == 'gray' && <p className='text' id='gray'>{this.props.letter}</p>}
        {this.props.color == 'green' && <p className='text' id='green'>{this.props.letter}</p>}
        {this.props.color == 'yellow' && <p className='text' id='yellow'>{this.props.letter}</p>}
      </div>
    );
  }
}
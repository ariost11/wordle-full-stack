import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

export default class Keyboard extends React.Component{
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    $('#keyboard').focus();
  }

  handleKeyDown(event) {
    if(event.key == "Backspace" || event.key === "Delete") {
      this.props.delete();
    } else if(event.key == "Enter") {
      event.preventDefault();
      this.props.submit();
    } else if(event.key.match(/^[a-zA-Z]$/)) {
      this.props.update(event.key.toUpperCase());
    } else {
      event.preventDefault();
    }
  }

  render() {
    $('#keyboard').focus();
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(a => 
      this.props.green.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-green' onClick={() => this.props.update(a)}>{a}</Button></Col> : 
      this.props.yellow.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-yellow' onClick={() => this.props.update(a)}>{a}</Button></Col> :
      this.props.gray.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-gray' onClick={() => this.props.update(a)}>{a}</Button></Col> :
      <Col className='no-frame' sm md="auto"><Button id='button' onClick={() => this.props.update(a)}>{a}</Button></Col>
    );
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(a => 
      this.props.green.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-green' onClick={() => this.props.update(a)}>{a}</Button></Col> : 
      this.props.yellow.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-yellow' onClick={() => this.props.update(a)}>{a}</Button></Col> :
      this.props.gray.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-gray' onClick={() => this.props.update(a)}>{a}</Button></Col> :
      <Col className='no-frame' sm md="auto"><Button id='button' onClick={() => this.props.update(a)}>{a}</Button></Col>
    );
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(a => 
      this.props.green.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-green' onClick={() => this.props.update(a)}>{a}</Button></Col> : 
      this.props.yellow.includes(a.toLowerCase()) ? <Col className='no-frane' sm md="auto"><Button id='button-yellow' onClick={() => this.props.update(a)}>{a}</Button></Col> :
      this.props.gray.includes(a.toLowerCase()) ? <Col className='no-frame' sm md="auto"><Button id='button-gray' onClick={() => this.props.update(a)}>{a}</Button></Col> :
      <Col className='no-frame' sm md="auto"><Button id='button' onClick={() => this.props.update(a)}>{a}</Button></Col>
    );
    return(
      <div onKeyDown={(e) => this.handleKeyDown(e)}>
        <Row className="justify-content-md-center">
          {firstRow}
        </Row>
        <Row className="justify-content-md-center">
          {secondRow}
        </Row>
        <Row className="justify-content-md-center">
          <Col className='no-frame' sm md="auto"><Button variant="flat" className='button-2' id='keyboard' onClick={() => this.props.submit()}>ENTER</Button></Col>
          {thirdRow}
          <Col className='no-frame' sm md="auto"><Button className='button-2' onClick={() => this.props.delete()}><FontAwesomeIcon id='icon' icon={faDeleteLeft}/></Button></Col>
        </Row>
      </div>
    );
  }
}
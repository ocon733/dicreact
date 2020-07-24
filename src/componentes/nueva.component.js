import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import * as Constantes from '../Constantes';

class Nueva extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            english:'',
            spain:'',
            descripcion:'',
            relmemotec:'',
            fonetic:'',
            error: '',
            modificar: false,
            aprendido: false          
        }
        
    }
    componentDidMount() {
        if ( this.props.match !== undefined && this.props.match.params !== undefined &&
            this.props.match.params.id !== undefined){
            const  id  = this.props.match.params.id;
            this.setState({modificar:true});
            this.cargarRegistro(id);

        }else{           
           this.setState({modificar:false});
        }
    }    

    cargarRegistro(id){
        fetch(Constantes.SERVIDOR + 'buscar.php?id='+id)
        .then(res=> res.json())
        .then( res => {
           let word = undefined;
           for (var x=0; x<res.length; x ++ ) {
                //arr.push( JSON.parse(res[x]));
                word = JSON.parse(res[x]);
           }

           
           let boolAprendido = word.aprendido === 1 ? true : false;
           

           this.setState({english:word.english,
                        spain:word.spain,
                        descripcion:word.descripcion,
                        relmemotec:word.relmemotec,
                        fonetic:word.fonetic,
                        id:word.id,
                        aprendido: boolAprendido
                    });
        });

    }

    handleSubmit(event){
        event.preventDefault();
        this.validaFormulario(event.target);
    }

    handleChecked = (event) => {
        this.setState({aprendido : !this.state.aprendido});
    }

    validaFormulario(t){
        this.setState ({error: ""});
        let isvalid = true;
        for( var e =0; e < t.length; e++){
            if ( t[e].name === "english" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la palabra en inglés, "}));
                isvalid = false;
            }
            if ( t[e].name === "fonetic" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la pronunciación figurada, "}));
                isvalid = false;
            }
            if ( t[e].name === "spain" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la traducción en español, "}));
                isvalid = false;
            }
            if ( t[e].name === "descripcion" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la frase de uso habitual, "}));
                isvalid = false;
            }
            if ( t[e].name === "relmemotec" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la regla nemotécnica para memorizar, "}));
                isvalid = false;
            }

        }

        if ( isvalid){
            
            const data = new FormData ( t);

            if ( this.state.modificar){
                fetch(Constantes.SERVIDOR + 'modificar.php', {
                    method: 'POST', 
                    body: data         
                }).then(res => res)
                .catch(error => console.error('Error:', error))
                .then(response => alert('Modificación realizada '));
            }else{
                fetch(Constantes.SERVIDOR + 'guardar.php', {
                    method: 'POST', 
                    body: data         
                }).then(res => res)
                .catch(error => console.error('Error:', error))
                .then(response => alert('Guardado correctamente '));
            }


        }
        
    }

    renderMensaje(){
        if( this.state.error.length !== 0){
            return(<Alert variant="danger"><p>{this.state.error}</p></Alert> );
        }
    }

    renderBotonera(){
        if( this.state.modificar){
            return (<Button varian="primary" type="submit">Modificar</Button>);
        }else{
            return (<Button varian="primary" type="submit">Guardar</Button>);
        }
    }


    render(){
        return(
            <Container>
              <Card>
                <Card.Body>
                  <Card.Title><h3>Nueva entrada diccionario</h3></Card.Title>
                
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>  
                            <Form.Group controlId="english" >
                                <Form.Label >Inglés</Form.Label>
                                <Form.Control name="english"  type="text" defaultValue={this.state.english}/>
                            </Form.Group>
                        </Col>

                        <Col> 
                            <Form.Group controlId="fonetic" >
                                <Form.Label >Pronunciación fonética</Form.Label>
                                <Form.Control name="fonetic"  type="text" defaultValue={this.state.fonetic}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                    <Form.Group controlId="spain" >
                        <Form.Label >Español</Form.Label>
                        <Form.Control name="spain"  type="text" defaultValue={this.state.spain}/>
                    </Form.Group>
                </Col>
                
                </Row>

                <Row><Col><Form.Group controlId="descripcion" >
                    <Form.Label >Uso en frase en inglés</Form.Label>
                    <Form.Control name="descripcion"  type="text" defaultValue={this.state.descripcion}/>
                </Form.Group>
                </Col>
                </Row>

                <Row><Col><Form.Group controlId="relmemotec" >
                    <Form.Label >Regla memotécnica</Form.Label>
                    <Form.Control name="relmemotec"  type="text" defaultValue={this.state.relmemotec}/>
                </Form.Group></Col></Row>
                <Row>
                <Col>
                <Form.Group controlId="aprendido" >
                    <Form.Check name="aprendido"  type="checkbox" label ="Aprendido" onChange={this.handleChecked} checked={this.state.aprendido} />
                </Form.Group></Col>
                </Row>
             



                <Form.Control name="id" type="hidden" defaultValue={this.state.id} />

                {this.renderMensaje()}                
<ButtonToolbar>
    {this.renderBotonera()}
</ButtonToolbar>
              
            </Form>
            </Card.Body>
            </Card>
            </Container>
        );
    }
}

export default Nueva;


import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import '../css/App.css';
import ControlPresupuesto from './ControlPresupuesto';
import { validarPresupuesto } from '../helper';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      presupuesto: '',
      restante: '',
      gastos: {

      }
    }
  }

  componentDidMount() {
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () => {
    let presupuesto = prompt('cual es el presupuesto?');
    let resultado = validarPresupuesto(presupuesto);
    if(resultado){
      this.setState({
        presupuesto,
        restante: presupuesto
      })
    } else {
      this.obtenerPresupuesto();
    }
  }


  //agregar un nuevo gasto al state

  agregarGasto = gasto => {
    //tomar copia del state actual
    const gastos = {...this.state.gastos};
    // agregar el gasto al obj del state
    gastos[`gasto${Date.now()}`] = gasto;
    //restar al presupuesto
    this.restarPresupuesto(gasto.cantidadGasto);
    // console.log(gastos);
    //ponerlo en el state
    this.setState({
      gastos
    })
  }

  //Restar del presupuesto 

  restarPresupuesto = cantidad => {
    //leer gasto
    let restar = Number(cantidad);
    //Tomar una copia del state actual
    let restante = this.state.restante;
    // lo restamos
    restante -= restar;

    restante = String(restante);
    //agregamos el nuevo state
    this.setState({
      restante
    })
  }


  render() {
    return (
      <div className="App container">
        <Header 
          titulo="Gasto Semanal"  
        />
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <Formulario 
                agregarGasto = {this.agregarGasto}
              />
            </div>
            <div className="one-half column">
              <Listado 
                gastos={this.state.gastos}
              />
              <ControlPresupuesto 
                presupuesto={this.state.presupuesto}
                restante={this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

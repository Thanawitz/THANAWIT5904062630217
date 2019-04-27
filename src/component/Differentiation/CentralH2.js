import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import '../Custom.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';

var X,Y,result;
class CentralH2 extends Component {
  constructor(props){
    super(props);
    this.state={submitted:false,x:"",h:"",e:"",d:"",showOutput:false};
    X=[];
    Y=[];
    result=0;
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CentralH2=this.CentralH2.bind(this);
  }
  clear(event){
    event.preventDefault();
    this.setState({submitted:false,x:"",h:"",e:"",d:"",showOutput:false});
    X=[];
    Y=[];
    result=0;
  }
  handleSubmit(event) {
    let str=this.state.e;
    let c=0;
    for(let i=0;i<str.length;i++){
      if(str[i]==="x"||str[i]==="X"){
        c++;
      }
    }
    if((str.length!==0)&&(c!==0)&&this.state.submitted){
      X=[];
      Y=[];
      result=0;
      this.CentralH2();
      this.setState({submitted:false,showOutput:true});
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
  }
  CentralH2(event){
    var func=(x)=>{
        let scope={x:x}
        let code=math.compile(this.state.e);
        return code.eval(scope);
      }

    var graph=()=>{
      for(let i=0;i<=10;i+=0.1){
          X.push(i);
          Y.push(func(i));
      }
    }

    var x=parseFloat(this.state.x);
    var h=parseFloat(this.state.h);
    var d=parseInt(this.state.d);
    switch (d) {
            case 1:
                result = (-1*func(x+(2*h)) + 8*func(x+(1*h)) - 8*func(x-(1*h)) + func(x-(2*h))) / (12*h);
                break;
            case 2:
                result = (-1*func(x+(2*h)) + 16*func(x+(1*h)) - 30*func(x) + 16*func(x-(1*h)) - func(x-(2*h))) / (12*Math.pow(h, d));
                break;
            case 3:
                result = (-1*func(x+(3*h)) + 8*func(x+(2*h)) - 13*func(x+(1*h)) + 13*func(x-(1*h)) - 8*func(x-(2*h)) + func(x-(3*h))) / (8*Math.pow(h, d));
                break;
            case 4:
                result = (-1*func(x+(3*h)) + 12*func(x+(2*h)) - 39*func(x+(1*h)) + 56*func(x) - 39*func(x-(1*h)) + 12*func(x-(2*h)) + func(x-(3*h))) / (6*Math.pow(h, d));
                break;
            default:
                console.log("Error");
        }
    graph();
  }
  render() {
    return (

      <div className="columns has-background-black">
                  <div className="column is-2">
                      <a href="#F"><div className="box has-text-centered is-custom">
                          <strong>Equation</strong>
                      </div></a>

                      <br/><br/>
                      <a href="#T"><div className="box has-text-centered is-custom">
                          <strong>Graph</strong>
                      </div></a>
                      <br/><br/>
                      <a href="#C"><div className="box has-text-centered is-custom">
                          <strong>Output</strong>
                      </div></a>
                  </div>
                  <div className="column is-10 is-custom">
                      <form id="F" className="box has-background-dark" onSubmit={this.handleSubmit}>
                          <h1 className="title is-1 has-text-white"><strong>Equation</strong></h1>
                          <hr className="is-divider"/>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    Equation :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="e" type="text" style={{width:"100vh"}} value={this.state.e} onChange={this.handleChange} placeholder="Enter Equation" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    x :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="x" type="number" style={{width:"110vh"}} step="any" value={this.state.x} onChange={this.handleChange} placeholder="Enter x"/>
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    h :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="h" type="number" style={{width:"110vh"}} step="any" value={this.state.h} onChange={this.handleChange} placeholder="Enter h" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    Degree :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="d" type="number" style={{width:"102vh"}} min="1" max="4" value={this.state.d} onChange={this.handleChange} placeholder="Enter Degree" />
                              </p>
                          </div><br/>
                          <div className="field has-addons">
                              <div className="control">
                                  <input type="submit" value="Submit" className="button is-success is-rounded"/>
                              </div>
                              <div className="control">
                                  <button className="button is-danger is-rounded" onClick={this.clear}>  Reset  </button>
                              </div>
                          </div>
                      </form>
                      {(this.state.showOutput)&&
                          <div>
                              <div className="box has-background-dark" id="T">
                                  <h1 className="title is-1 has-text-white">Graph</h1>
                                  <hr className="is-divider"/>
                                  <div>
                                      <Plot
                                          data={[
                                              {
                                                  x:X,
                                                  y:Y,
                                                  type:'scatter'
                                              }
                                          ]}
                                          latout={{width:500,height:300}}
                                      />
                                  </div>
                              </div>
                              <div className="box has-background-dark" id="C">
                                  <h1 className="title is-1 has-text-white">Output</h1>
                                  <hr className="is-divider"/>
                                  <h2 className="title is-2 has-text-white"><strong>The Approximate is {result}</strong></h2><br/><br/>
                              </div>
                          </div>
                      }

                  </div>
      </div>
    );
  }
}
export default CentralH2;
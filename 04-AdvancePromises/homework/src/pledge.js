'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise (executor) {
  if(typeof executor !== "function") throw TypeError("executor no es una function")
  
    this._state = 'pending';
    this._value = undefined
    this._handlerGroups = []
    


    this._internalResolve = (data) =>{
      if(this._state === "pending") {
        this._state = "fulfilled"
        this._value = data
        this._callHandlers()
      }
    }

    this._internalReject = (reason) => {
    if(this._state === "pending") {
      this._state = "rejected"
      this._value = reason
      this._callHandlers()
      }
    }

    this.resolve = () => {}

    executor (this._internalResolve,this._internalReject) 
    
    }

    
   $Promise.prototype._callHandlers = function () {
    while(this._handlerGroups.length) {
      const grupo = this._handlerGroups.shift();
        if(this._state === 'fulfilled') {
          if(grupo.successCb){
        try {
        const result = grupo.successCb(this._value)

        if(result instanceof $Promise){
          return result.then(
            (value) => grupo.downstreamPromise._internalResolve(value),
            (reason) => grupo.downstreamPromise._internalReject(reason)
          )
        } else {
          grupo.downstreamPromise._internalResolve(result)
        }
      } 
      catch (error){
        grupo.downstreamPromise._internalReject(error);
      }
      } else {
        grupo.downstreamPromise._internalResolve(this._value)
    }    
  } 
    else if(this._state === 'rejected' ) {
      if(grupo.errorCb){
        try {
        const result = grupo.errorCb(this._value)

        if(result instanceof $Promise){
          return result.then(
            (value) => grupo.downstreamPromise._internalResolve(value),
            (reason) => grupo.downstreamPromise._internalReject(reason)
          )
        } else {
          grupo.downstreamPromise._internalResolve(result)
        }
      } 
      catch (error){
        grupo.downstreamPromise._internalReject(error);
        }
      } else {
        grupo.downstreamPromise._internalReject(this._value)
    }    
  } 
    }
    }
   

    $Promise.prototype.then = function (successCb, errorCb) {
        const downstreamPromise = new $Promise (() => {})


        this._handlerGroups.push({
        successCb: typeof successCb === 'function' ? successCb : false,
        //if (typeof successCb === function) return successCb; else return false,
        errorCb: typeof errorCb === "function" ? errorCb : false,
        downstreamPromise,
      });

      if(this._state !== "pending"){
        this._callHandlers(this._value);
      }
      return downstreamPromise;
    }

    $Promise.prototype.catch = function(errorCb){
      return this.then(null, errorCb)
    }


   



   
 
    






    
  

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

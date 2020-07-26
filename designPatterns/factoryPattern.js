/**
 * Reference - https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript
 *
 */


// A constructor for defining new cars
function Car (options) {

  // some defaults
  this.doors = options.doors || 4
  this.state = options.state || 'brand new'
  this.color = options.color || 'silver'
}

// A constructor for defining new trucks
function Truck (options) {
  this.state = options.state || 'used'
  this.wheelSize = options.wheelSize || 'large'
  this.color = options.color || 'blue'
}


// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory () {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function (options) {
  switch (options.vehicleType) {
    case 'car':
      this.vehicleClass = Car
      break
    case 'truck':
      this.vehicleClass = Truck
      break
  // defaults to VehicleFactory.prototype.vehicleClass (Car)
  }

  return new this.vehicleClass(options)
}

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory()
var car = carFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
  doors: 6
})

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car)

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car)

var movingTruck = carFactory.createVehicle( {
    vehicleType: "truck",
    state: "like new",
    color: "red",
    wheelSize: "small" } );

// Test to confirm our truck was created with the vehicleClass/prototype Truck

// Outputs: true
console.log( movingTruck instanceof Truck );

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log( movingTruck );

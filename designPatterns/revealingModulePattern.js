/**
 * Reference - https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 *
 */
var myRevealingModule = (function () {
  var privateVar = 'Ben Cherry'
  var publicVar = 'Hey there!'

  function privateFunction () {
    console.log('Name:' + privateVar)
  }

  function publicSetName (strName) {
    privateVar = strName
  }

  function publicGetName () {
    privateFunction()
  }

  // Reveal public pointers to
  // private functions and properties

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
})()

myRevealingModule.setName('Paul Kinlan')

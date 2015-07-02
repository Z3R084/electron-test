var path = require( 'path' );
var fs = require( 'fs' );
var childProcess = require( 'child_process' );

var pythonExecutable = process.env.PYTHON;

module.exports = function( cb ) {
  verifyNode( function( error, nodeSuccessMessage ) {
    if( error ) {
      cb( error );
      return;
    }

    verifyNpm( function( error, npmSuccessMessage ) {
      if( error ) {
        cb( error );
        return;
      }

      verifyPython27( function( error, pythonSuccessMessage ) {
        cb( error, ( nodeSuccessMessage + "\n" + npmSuccessMessage + "\n" + pythonSuccessMessage ).trim() );
      } );
    });
  });
};

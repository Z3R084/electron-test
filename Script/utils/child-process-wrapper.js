var childProcess = require( 'child_process' );

exports.safeExec = function( command, options, callback ) {
  if( !callback ) {
    callback = options;
    options = {};
  }
  if( !options ) {
    options = {};
  }

  options.maxBuffer = 1024 * 1024;

  var child = childProcess.exec( command, options, function( error, stdout, stderr ) {
    if( error ) {
      process.exit( error.code || 1 );
    }
    else {
      callback( null );
    }
  });
  child.stderr.pipe( process.stderr );
  if( !options.ignoreStdout ) {
    child.stdout.pipe( process.stdout );
  }
}

exports.safeSpawn = function( command, args, options, callback ) {
  if( !callback ) {
    callback = options;
    options = {};
  }
  var child = childProcess.spawn( command, args, options );
  child.stderr.pipe( process.stderr );
  child.stdout.pipe( process.stdout );
  child.on( 'exit', function( code ) {
    if( code != 0 ) {
      process.exit( code );
    }
    else {
      callback( null );
    }
  });
}

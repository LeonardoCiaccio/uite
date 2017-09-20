/*
    
    $.uite 2.0.0 extension, semantic-ui functions
    
    © Copyright Leonardo Ciaccio 2015/16
    leonardo.ciaccio@gmail.com

    MIT license
    https://tldrlegal.com/license/mit-license
    
    **********************************************************************
    
    ( $.uite 2.0.0 )[ https://tldrlegal.com/license/mit-license ]

*/

( function( $U, $I, config, tools ){
    
    "use strict";
    
    if( !$U || !$I ){
        
        var err = "$.uite.tools.edit require '$.uite' framework";
        
        alert( err );
        
        throw new Error( err );
    
    }
    
    var proto = "<div class='row'></div>";
    
    if( !$U.tools.select || $I().selected().append( proto ).length < 1 )
        $( "body" ).append( proto );
        
    
} )( window.$U, window.$I );
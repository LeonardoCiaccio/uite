/*
    
    $.uite 2.0.0 extension, manage source code
    
    © Copyright Leonardo Ciaccio 2015/16
    leonado.ciaccio@gmail.com

    MIT license
    https://tldrlegal.com/license/mit-license
    
    **********************************************************************
    
    ( $.uite 2.0.0 )[ https://tldrlegal.com/license/mit-license ]

*/

( function( $U, $I, config ){
    
    "use strict";
    
    if( !$U || !$I )
        throw new Error( "$.uite.tools.file require '$.uite' framework" );
    
// --> Global vars
    
    var toolName = "file";
    
// --> some service
    
    function _getStoredConfig(){
        
        return $.data( document.body, "config" ) || {};
        
    };
    
    function _updateStoredConfig( newValue ){
        
        var oldConfig = _getStoredConfig(),
            newConfig = $.extend( oldConfig, newValue );
        
        $.data( document.body, "config", newConfig );
        
    };
    
// --> Install and overwrite this tool name
    
    $U.tools.install( 
        
        { // --> tool, core of this plugin for $.uite framework
        
            badge : $.extend( {}, config.badge ),
            name  : toolName,
            fn    : {
                
                snapshot : function(){
                    
                    var $tmpD         = $( "<div>" ),
                        $storedConfig = _getStoredConfig();
                    
                    $tmpD.append( $( "html" ).first().clone() );

                // --> if setted go on
                    
                    var dType = 
                        $storedConfig.doctype
                    
                        ||
                        
                        $.trim( prompt( "Doctype ?", config.doctype ) )
                    ;
                    
                    
                    if( !dType || dType.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { doctype : dType } );
                    
                    var snapDocument = dType + $tmpD.html(); 

                    $tmpD.remove();

                    var page = window.open();

                    page.document.write( snapDocument );
                    page.document.close();
                    
                    return true;
                    
                }
                
                ,
                
                export : function(){
                    
                    var $tmpD         = $( "<div>" ),
                        $storedConfig = _getStoredConfig();

                    $tmpD.append( $( "html" ).first().clone() );

                // --> if setted go on
                    
                    var dType = 
                        $storedConfig.doctype
                    
                        ||
                        
                        $.trim( prompt( "Doctype ?", config.doctype ) )
                    ;
                    
                    if( !dType || dType.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { doctype : dType } );
                    
                    var snapDocument = dType + $tmpD.html(); 

                    $tmpD.remove();
                    
                    var fileName = 
                        $storedConfig.fileName
                    
                        ||
                        
                        $.trim( prompt( "File Name ?", config.fileName ) )
                    ;                   
                    
                    
                    if( !fileName || fileName.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { fileName : fileName } );
                    
                    var $tmpA = $( "<a>" );

                    $tmpA.attr( "href", "data:text/plain;charset=utf-8," + encodeURIComponent( snapDocument ) )
                         .attr( "download", fileName );

                    $tmpA[ 0 ].click();
                    $tmpA[ 0 ].remove();
                    
                    return true;
                    
                }
                
                ,
                
                save : function(){
                    
                // --> test localstorage
                    
                    try{
                        
                        localStorage[ "test" ] = "Test pass !";
                        
                    }catch( e ){
                        
                        if( confirm( "This browser not support local storage, export to file ?" ) )
                            return $I().export();
                            
                        return false;
                        
                    }
                    
                    var $tmpD         = $( "<div>" ),
                        $storedConfig = _getStoredConfig();

                    $tmpD.append( $( "html" ).first().clone() );

                // --> if setted go on
                    
                    var dType = 
                        $storedConfig.doctype
                    
                        ||
                        
                        $.trim( prompt( "Doctype ?", config.doctype ) )
                    ;
                    
                    if( !dType || dType.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { doctype : dType } );
                    
                    var snapDocument = dType + $tmpD.html(); 

                    $tmpD.remove();
                    
                    var fileName = 
                        $storedConfig.storeName
                    
                        ||
                        
                        $.trim( prompt( "Name ?", config.storeName ) )
                    ;                   
                    
                    
                    if( !fileName || fileName.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { storeName : fileName } );
                                        
                    localStorage[ config.signFile + "-" + fileName ] = snapDocument;
                    
                    alert( "'" + fileName + "' saved at " + document.location.href );
                    
                    return true;
                    
                }
                
                ,
                
                saveAs : function(){
                    
                // --> test localstorage
                    
                    try{
                        
                        localStorage[ "test" ] = "Test pass !";
                        
                    }catch( e ){
                        
                        if( confirm( "This browser not support local storage, export to file ?" ) )
                            return $I().export();
                            
                        return false;
                        
                    }
                    
                    var $tmpD         = $( "<div>" ),
                        $storedConfig = _getStoredConfig();

                    $tmpD.append( $( "html" ).first().clone() );

                // --> if setted go on
                    
                    var dType = 
                        $storedConfig.doctype
                    
                        ||
                        
                        $.trim( prompt( "Doctype ?", config.doctype ) )
                    ;
                    
                    if( !dType || dType.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { doctype : dType } );
                    
                    var snapDocument = dType + $tmpD.html(); 

                    $tmpD.remove();
                    
                    var fileName = $.trim( prompt( "Name ?", $storedConfig.storeName || config.storeName ) );                   
                    
                    
                    if( !fileName || fileName.length < 1 )return false;
                    
                // --> update new config
                    
                    _updateStoredConfig( { storeName : fileName } );
                    
                    if( 
                        typeof localStorage[ config.signFile + "-" + fileName ] != "undefined" 
                    
                        &&
                        
                        !confirm( "This file exist, overwrite ?" )
                        
                    )return false;
                    
                    
                    localStorage[ config.signFile + "-" + fileName ] = snapDocument;
                    
                    alert( "'" + fileName + "' saved at " + document.location.href );
                    
                    return true;
                    
                }
                
                ,
                
                open : function(){
                    
                // --> test localstorage
                    
                    var allFiles = [];
                    
                    try{
                        
                        for( var key in localStorage ){
                            
                            if( key.indexOf( config.signFile ) == 0 ){
                                
                                var cleanName = key.replace( config.signFile + "-", "" );
                                allFiles.push( cleanName );
                                
                            }
                            
                        }                    
                        
                    }catch( e ){
                        
                        alert( "This browser not support local storage !" );                            
                        return false;
                        
                    }
                        
                    if( allFiles.length < 1 ){
                        
                        alert( "On this location, no files saved !" );
                        return false;
                    
                    }
                    
                    var message = $.map( allFiles, function( val, i ){
                        
                        return ( i + " : " + val );
                        
                    } );     
                    
                    message = "Digit the number to open :\r\n" + 
                              message.join( "\r\n" );
                    
                    var fileNumber = $.trim( prompt( message, "0" ) );
                    if( !fileNumber || fileNumber.length < 1 )return false;
                    
                    fileNumber = parseInt( fileNumber );
                    if( !$.isNumeric( fileNumber ) || fileNumber < 0 || fileNumber > allFiles.length -1 ){
                        
                        alert( "This file not exist !" );
                        return false;
                        
                    }
                    
                    var snapDocument = localStorage[ config.signFile + "-" + allFiles[ fileNumber ] ],
                        page         = window.open();

                    page.document.write( snapDocument );
                    page.document.close();
                    
                    return true;
                    
                }
                
            }
            
        } // <-- tool
        
        ,
        
        { // --> handleListObj, list for all events bind in this plugin 
                 
            
            
        } // <-- handleListObj
    
    );
    
// <-- Install this tool
    
// --> UnInstall this tool
    
    $U.tools.uninstall( toolName, function(){
                
        
        
    } );
    
// <-- UnInstall this tool
    
// --> Operation on change tools and this lost

    $U.tools.change( toolName, function(){
                
        
        
    } );
    
    
// --> Bind all events of this plugin
    
    $U.tools[ toolName ].onService();   
    
    
// <-- END
    
} )( 
    
    window.$U // <-- Required
    
    ,
    
    window.$I // <-- Required
    ,
    
    { // --> Config, configuration for this plugin
    
        badge : {

            name        : "$.uite.tools.file",
            description : "File manipulation function for '$U' framework",
            version     : "1.0.0",
            author      : "Leonardo Ciaccio",
            contact     : "leonardo.ciaccio@gmail.com",
            project     : ""

        }
        
        ,
        
        doctype : "<!DOCTYPE html>"
        
        ,
        
        fileName : "My.Page.With.$UITE.html"
        
        ,
        
        storeName : "My.Page.With.$UITE"
        
        ,
        
        signFile : "$UITE-FILE"

    } // <-- Config
   
);
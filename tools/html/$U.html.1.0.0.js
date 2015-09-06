/*
    
    $.uite 2.0.0 extension, editing for custom style and script
    
    © Copyright Leonardo Ciaccio 2015/16
    leonado.ciaccio@gmail.com

    MIT license
    https://tldrlegal.com/license/mit-license
    
    **********************************************************************
    
    ( $.uite 2.0.0 )[ https://tldrlegal.com/license/mit-license ]
    
    **********************************************************************
    
    Discussion :

    TAB handle work fine if loaded in html or injected from console,
    but on bookmarklet not work, why ?

*/

( function( $U, $I, config ){
    
    "use strict";
    
    if( !$U || !$I )
        throw new Error( "$.uite.tools.html require '$.uite' framework" );
    
// --> Global vars
    
    var toolName          = "html",
        lastHandleKeyDown = function(){},
        lastHandleKeyUp   = function(){};
    
// --> Create styles for this plugin
    
    function _appendMyStyle(){
        
        var $mystyle = $( "#" + config.selectors.styleID );
    
        if( !$mystyle || $mystyle.length < 1 ){

            $mystyle = $( "<style>" );
            $mystyle
                .attr( "id", config.selectors.styleID )
                .html( config.styles )
            ;

            $( "head" ).append( $mystyle );

        }
        
    };
        
// --> handle fo reset all styles and remove wrapper
    
    function _reset(){
        
        $( "." + config.selectors.body ).removeClass( config.selectors.body );
        
        $( "." + config.selectors.worker ).remove();
        
    };
    
// --> handle for key down worker style
    
    function handleKeyDownTAB( event ){
                
        var keyCode = event.keyCode || event.which;
        
    // --> for this, http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
        
        if( keyCode === 9 ){
            
            event.preventDefault();
            
            var start = event.target.selectionStart,
                end   = event.target.selectionEnd;

            $( event.target )
                .val( 
                        $( event.target ).val().substring( 0, start )
                        + "\t"
                        + $( event.target ).val().substring( end ) 
                );

            event.target.selectionStart = event.target.selectionEnd = start + 1;
            
        }
        
    };
    
// --> handle for key up worker style
    
    function handleStyleKeyUpWorker( event ){
                
    // --> get a worker and customstyle
        
        var $worker = $( event.target ),
            $style  = $( "#" + config.selectors.customStyle ),
            keyCode = event.keyCode || event.which;
                
        $style.html( $worker.val() );
        
        if( keyCode === 27 ) _reset();
        
    };
    
// --> handle for key up worker script
    
    function handleScriptKeyUpWorker( event ){
                
    // --> get a worker and customsscript
        
        var $worker = $( event.target ),
            $script = $( "#" + config.selectors.customScript ),
            keyCode = event.keyCode || event.which;
                
        $script.html( $worker.val() );
        
        if( keyCode === 27 ) _reset();
        
    };    

// --> Install and overwrite this tool name
    
    $U.tools.install( 
        
        { // --> tool, core of this plugin for $.uite framework
        
            badge : $.extend( {}, config.badge ),
            name  : toolName,
            fn    : {
                
                editStyle : function(){
                    
                    _appendMyStyle();
                    
                // --> Get custom style
                    
                    var $cStyle = $( "#" + config.selectors.customStyle );
                    
                    if( !$cStyle || $cStyle.length < 1 ){
                        
                        $cStyle = $( "<style>" ).attr( "id", config.selectors.customStyle );
                        $( "head" ).append( $cStyle );
                    
                    }
                 
                // --> reset all styles
        
                    _reset();
                    
                // --> append worker and prepare the works
                    
                    var $worker = $( "<textarea>" )
                                    .addClass( config.selectors.worker )
                                    .html( $cStyle.html() );
                    
                    $( "body" )
                        .addClass( config.selectors.body )
                        .append( $worker );
                    
                // --> bind event to textare for updating style
                    
                    $worker
                        .unbind( "keydown", lastHandleKeyDown )
                        .bind( "keydown", handleKeyDownTAB )
                        .unbind( "keyup", lastHandleKeyUp )
                        .bind( "keyup", handleStyleKeyUpWorker )
                        .focus();
                    
                    lastHandleKeyDown = handleKeyDownTAB;
                    lastHandleKeyUp   = handleStyleKeyUpWorker;
                    
                }
                
                ,
                
                editScript : function(){
                    
                    _appendMyStyle();
                    
                // --> Get custom style
                    
                    var $cScript = $( "#" + config.selectors.customScript );
                    
                    if( !$cScript || $cScript.length < 1 ){
                        
                        $cScript = $( "<script>" ).attr( "id", config.selectors.customScript );
                        $( "head" ).append( $cScript );
                    
                    }
                    
                // --> reset all styles
        
                    _reset();
                    
                // --> append worker and prepare the works
                    
                    var $worker = $( "<textarea>" )
                                    .addClass( config.selectors.worker )
                                    .html( $cScript.html() );
                    
                    $( "body" )
                        .addClass( config.selectors.body )
                        .append( $worker );
                    
                // --> bind event to textare for updating script
                    
                    
                    
                    $worker
                        .unbind( "keydown", lastHandleKeyDown )
                        .bind( "keydown", handleKeyDownTAB )
                        .unbind( "keyup", lastHandleKeyUp )
                        .bind( "keyup", handleScriptKeyUpWorker )
                        .focus();
                    
                    lastHandleKeyDown = handleKeyDownTAB;
                    lastHandleKeyUp   = handleScriptKeyUpWorker;
                    
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
        
    // --> reset all styles
        
        _reset();
        
    // --> remove styles append
        
        $( "#" + config.selectors.styleID ).remove();
        
    } );
    
// <-- UnInstall this tool
    
// --> Operation on change tools and this lost

    $U.tools.change( toolName, function(){
                
    // --> reset all styles
        
        _reset();
        
    // --> remove styles append
        
        $( "#" + config.selectors.styleID ).remove();
        
    } );
    
    
// --> Bind all events of this plugin

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

            name        : "$.uite.tools.html",
            description : "HTML function for '$.uite' framework",
            version     : "1.0.0",
            author      : "Leonardo Ciaccio",
            contact     : "leonardo.ciaccio@gmail.com",
            project     : ""

        }
        
        ,
        
        selectors : {
            
            styleID       : "uite-html-style",
            body          : "uite-html-body",
            worker        : "uite-html-worker",
            customStyle   : "uite-custom-style",
            customScript  : "uite-custom-script"
            
        }
        
        ,
        
        styles : ".uite-html-body{padding-left: 300px!important;}.uite-html-worker{top : 0px!important;left: 0px!important;position: fixed!important;height: 100%!important;min-width: 300px!important;overflow: auto!important;color:black!important;font-family: tahoma, verdana, sans-serif!important;font-size: 12px!important;padding: 10px!important;z-index: 9999999999;}"

    } // <-- Config
   
);
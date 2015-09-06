/*
    
    $.uite , jQuery micro framework for html editing
    
    © Copyright Leonardo Ciaccio 2015/16
    leonado.ciaccio@gmail.com

    MIT license
    https://tldrlegal.com/license/mit-license
    
    **********************************************************************
    
    ( jQuery license )[ https://tldrlegal.com/license/mit-license ]
    
*/

( function( $, config ){
    
    "use strict";
    
// --> Check jQuery
    
    if( !$ )throw new Error( "$.uite require jQuery !" );

// --> Global vars
    
    var lastHandlesList     = {},
        lastToolLostService = function(){};
    
// --> Entend jQuery obj
    
    $.extend( 
            
        // --> uite '$U'
            
            { uite : {
            
            // --> uite.fn
                
                fn : {}
                
            // <-- uite.fn
                
                ,    
                
            // --> uite.selector '$I()'
                
                selector : function( selector ){
                                                            
                    return $.extend( $( selector ), $.uite.fn );
                    
                }
                
            // <-- uite.selector
                
                ,
                
            // --> uite.badge
                
                badge : $.extend( {}, config.badge )
                
            // <-- uite.badge
                
                ,
                
            // --> uite.tools
                
                tools : {
                    
                // --> uite.tools.install
                    
                    install : function( tool, handleListObj ){
                        
                        var newTool = {};
                        
                    // --> Check tool
                        
                        if( !tool || !tool.badge || !tool.fn || typeof tool.fn != "object" )
                            throw new Error( "$.uite.tools.install() require tool object !" );
                    
                    // --> Trigger last lost service
                        
                        lastToolLostService();
                        
                    // --> Set new tool 'fn' *****
                        
                        newTool.fn = $.extend( {}, tool.fn );
                        
                    // --> Check tool.badge information
                        
                        for( var badgeProp in config.badge  ){
                            
                            if( !tool.badge.hasOwnProperty( badgeProp ) ){
                               
                                throw new Error( "$.uite.tools.install() require tool.badge '" + badgeProp + "' !" );
                                
                            }
                            
                        }
                    
                    // --> Set new tool 'badge' *****
                        
                        newTool.badge = $.extend( {}, tool.badge );
                        
                    // --> Setup handleListObj
                        
                        var newHandlesList = {};
                        
                        for( var handleProp in $.uite.tools.handles  ){
                            
                            ( handleListObj.hasOwnProperty( handleProp ) && typeof handleListObj[ handleProp ] == "function" )
                            ? newHandlesList[ handleProp ] = handleListObj[ handleProp ]
                            : newHandlesList[ handleProp ] = $.uite.tools.handles[ handleProp ]                   
                            ;
                            
                        }
                        
                    // --> Set new tool 'handles' *****
                        
                        newTool.handles = $.extend( {}, newHandlesList );
                        
                    // --> Check name
                        
                        tool.name = $.trim( tool.name );
                        
                        if( !tool.name || typeof tool.name != "string" || tool.name.length < 1 )
                            throw new Error( "$.uite.tools.install() require string 'name' !" );
                        
                        tool.name = tool.name.replace( /\W/gi, "" );
                        
                    // --> Set new tool 'onService()' *****
                        
                        newTool.onService = function(){
                            
                            var $worker = $( "body" ).find( "*" );
                            
                        // --> unbind all old events
                                                        
                            for( var ev in $.uite.tools.handles ){
                                
                                if( lastHandlesList.hasOwnProperty( ev ) ){
                                    
                                    $worker
                                        .unbind( ev, lastHandlesList[ ev ] );
                                    
                                }
                                
                            }
                            
                            lastHandlesList = $.extend( lastHandlesList, newTool.handles );
                            
                        // --> bind all new events
                                                        
                            for( var ev in $.uite.tools.handles ){
                                
                                if( lastHandlesList.hasOwnProperty( ev ) ){
                                    
                                    switch( ev ){
                                    
                                    // --> flag to false, i can remove this switch but not for now
                                            
                                        case "dragstart" :
                                            
                                            $worker.bind( ev, lastHandlesList[ ev ] ); // ,false );
                                            
                                            break;
                                            
                                     // --> for all events      
                                        
                                        default :
                                            
                                            $worker.bind( ev, lastHandlesList[ ev ] );
                                            
                                    }
                                    
                                }
                                
                            }
                            
                        };
                    
                    // --> Set new tool 'onUninstall()' *****
                        
                        newTool.onUnistall = function(){};
                        
                    // --> Set new tool 'onChange()' *****
                        
                        newTool.onChange = function(){};
                        
                    // --> Extend $.uite.tools
                        
                        $.uite.tools[ tool.name ] = $.extend( $.uite.tools[ tool.name ] || {}, newTool );
                                   
                    // --> Extend $.uite.fn
                        
                        $.uite.fn = $.extend( $.uite.fn || {}, $.uite.tools[ tool.name ].fn );
                        
                    }
                    
                // <-- uite.tools.install
                    
                    ,
                    
                // --> uite.tools.uninstall, clean all tools works
                    
                    uninstall : function( name, handle ){
                        
                        if( typeof handle != "function" )
                            throw new Error( "$.uite.tools.uninstall() require valid function !" );
                      
                        name = $.trim( name );
                        
                        if( !name || typeof name != "string" || name.length < 1 )
                            throw new Error( "$.uite.tools.uninstall() require string 'name' !" );
                        
                        name = name.replace( /\W/gi, "" );
                        
                    // --> update and bind new handle
                        
                        if( typeof $.uite.tools[ name ] != "undefined" )
                            $.uite.tools[ name ].onUnistall = handle;
                        
                    }
                    
                // <-- uite.tools.uninstall
                    
                    ,
                    
                // --> uite.tools.change, clean all tools works
                    
                    change : function( name, handle ){
                        
                        if( typeof handle != "function" )
                            throw new Error( "$.uite.tools.uninstall() require valid function !" );
                      
                        name = $.trim( name );
                        
                        if( !name || typeof name != "string" || name.length < 1 )
                            throw new Error( "$.uite.tools.uninstall() require string 'name' !" );
                        
                        name = name.replace( /\W/gi, "" );
                        
                    // --> update and bind new handle
                        
                        if( typeof $.uite.tools[ name ] != "undefined" )
                            $.uite.tools[ name ].onChange = handle;
                        
                    // --> update last lost service
                        
                        lastToolLostService = $.uite.tools[ name ].onChange;
                        
                    }
                    
                // <-- uite.tools.change
                    
                    ,
                    
                // --> uite.tools.handles
                    
                    handles : {
                        
                        click       : function(){},
                        mouseover   : function(){},
                        mouseout    : function(){},
                        keyup       : function(){},
                        keydown     : function(){},
                        dblclick    : function(){},
                        blur        : function(){},
                        dragstart   : function(){},
                        dragenter   : function(){},
                        dragover    : function(){},
                        dragend     : function(){},
                        drop        : function(){}
                        
                    }
                    
                // <-- uite.tools.handles
                    
                }
                
            // <-- uite.tools
                
                ,
                
            // --> uite.remove
                
                remove : function(){
                    
                    var $worker = $( "body" ).find( "*" );
                    
                // --> unbind last events
                    
                    for( var ev in lastHandlesList ){
                                
                        if( lastHandlesList.hasOwnProperty( ev ) ){

                            $worker
                                .unbind( ev, lastHandlesList[ ev ] );

                        }

                    }
                    
                // --> uninstall all tools handle
                    
                    for( var tool in $.uite.tools ){
                                
                        if( typeof $.uite.tools[ tool ].onUnistall == "function" )
                            $.uite.tools[ tool ].onUnistall();

                    }
                    
                // --> remove all external signature
                    
                    $( "." + config.signature ).remove();
                    
                }
                
            // <-- uite.remove

            } } 
        
        // <-- uite
            
        );
    
// <-- Entend jQuery obj 
    
// --> Init of lastHandlesList
    
    lastHandlesList = $.extend( lastHandlesList, $.uite.tools.handles );
    
// --> DOM obj
    
    // --> installation and manage
        
        window.$U = $.uite;
    
    // --> uite extensions
    
        window.$I = $.uite.selector;
    
// --> Prevent change page
    
    window.onbeforeunload = function(){
                
        return "Hey, you saved this session ?";

    };
    
// <-- END    

} )(  
    
    window.jQuery
    
    ,
    
    { // --> Config
    
        badge : {

            name        : "$.uite",
            description : "Microframework for html editing",
            version     : "2.0.0",
            author      : "Leonardo Ciaccio",
            contact     : "leonardo.ciaccio@gmail.com",
            project     : ""

        }
        
        ,
        
        signature : "uite-remove-this"

    } // <-- Config
        
);
    
    
    
    
    
    
    
    



















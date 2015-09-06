/*

    Little tool for $.uite microframework.
    Test some function and if need install jQuery

*/

( function( config, tools ){
    
    "use strict";
    
// --> Install all libs if not exist
    
    // --> Iterator
    
        var require = function( libs, onEnd ){

            onEnd = onEnd || function(){};

        // --> The End ?

            if( !libs || libs.length < 1 )return onEnd();

        // --> This lib is loaded ?

            var lib    = libs.splice( 0, 1);            
            if( lib[ 0 ].isLoaded() )return require( libs, onEnd );
        
        // --> Start a timeoutloading
            
            var loading = new tools.timeOutLoading( lib[ 0 ] );
            
        // --> Create and install

            var script = document.createElement( "script" );

            script.setAttribute( "src", lib[ 0 ].cdn );
            script.setAttribute( "class", config.signature );
            
            
            tools.addEvent( "load", script, function(){

                require( libs, onEnd );

            } );

            document.getElementsByTagName( "head" )[ 0 ].appendChild( script );

        }; 
    
    // <-- Iterator
        
    // --> Install
        
        require( config.libs.slice(), function(){

            if( !tools.testModernFeature() ){

                alert( "Your browser not support some feature of $UITE, use Chrome for great experience !" );

                return false;

            }    

        // --> Enjoy
            
            alert( "Your browser work fine, now you can start '$UITE' framework !" );
            
            return true;
            
        } );
    
// <-- Install all libs if not exist
    
} )(

    // --> Config
    
    {
        
        signature : "uite-remove-this"
        
        ,
        
        libs : [

            {

                name     : "jQuery",
                isLoaded : function(){
                    
                    return ( typeof window.jQuery != "undefined" );
                
                },
                cdn      : "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"

            },
            {

                name     : "Moderniz",
                isLoaded : function(){
                    
                    return ( typeof window.Modernizr != "undefined" )
                
                },
                cdn      : "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"

            }

        ]
        
    }
    
    // <-- Config
    
    ,
    
     // --> Tools
    
    {
        
        testModernFeature : function(){
            
        // --> Test browser compatibility
            
            try{
                
                if( !Modernizr.draganddrop || !window.getComputedStyle )return false;
                
                return true;
                
            }catch( e ){
                
                return false;
                
            }
            
        },
        addEvent : function( evnt, elem, func ){
        
            try{

                if( elem.addEventListener ){

                    elem.addEventListener( evnt, func, false );

                }else if( elem.attachEvent ){

                     var r = elem.attachEvent( "on" + evnt, func );

                }

                return true;

            }catch( e ){

                return false;

            }		    

        },
        timeOutLoading : function( lib ){
            
            if( !lib )return false;
            
            var ti = setTimeout( function(){

                if( !lib.isLoaded() ){

                    alert( "I Can't load " + lib.name + ", load manualy with console !" );

                    document.location.reload();

                    return false;

                }

                clearTimeout( ti );

            } , 5000);
            
        }
        
    } 
    
    // <-- Tools
    
);









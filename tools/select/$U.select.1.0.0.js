/*
    
    $.uite 2.0.0 extension for elements selecting
    
    © Copyright Leonardo Ciaccio 2015/16
    leonardo.ciaccio@gmail.com

    MIT license
    https://tldrlegal.com/license/mit-license
    
    **********************************************************************
    
    ( $.uite 2.0.0 )[ https://tldrlegal.com/license/mit-license ]
    
*/

( function( $U, $I, config ){
    
    "use strict";
    
    if( !$U || !$I )
        throw new Error( "$.uite.tools.select require '$.uite' framework" );
    
// --> Global vars
    
    var toolName = "select",
        flag     = 0; // <-- 0 = element; -1 = parent ; 1 = child;
    
// --> Create styles for this plugin
    
    var styleID = config.selectors.styleID,
        mystyle = $( "#" + styleID );
    
    if( !mystyle || mystyle.length < 1 ){
        
        mystyle = $( "<style>" );
        mystyle
            .attr( "id", styleID )
            .html( config.styles )
        ;
        
        $( "head" ).append( mystyle );
        
    }
    
    
// --> Install and overwrite this tool name
    
    $U.tools.install( 
        
        { // --> tool, core of this plugin for $.uite framework
        
            badge : $.extend( {}, config.badge ),
            name  : toolName,
            fn    : {
                
            // --> userSelect, request jquery selector from user and return this selected
                
                userSelect : function(){
                
                    var selector = $.trim( prompt( "Please type jquery selector !" ) );
                    
                    if( !selector || selector.length < 1 )return false;
                    
                    return $I( selector ).select();
                    
                }
                
            // <-- userSelect
                
                ,
                
            // --> selected, return all elements selected
                
                selected : function(){
                    
                    return $( "." + config.selectors.selected );
                    
                }
                
            // <-- selected
                
                ,
                
            // --> select, select some elements and return this
                
                select : function(){
                    
                    return this.each( function(){
                        
                        if( !$( this ).hasClass( config.selectors.selected ) )
                            $( this ).addClass( config.selectors.selected );
                        
                    } );
                    
                }
                
            // <-- select
                
                ,
                
            // --> setFlagToSelectOnclick, set a flag value for click event
                
                setFlagToSelectOnclick : function( uFlag ){
                    
                    flag = ( uFlag > 1 || uFlag == 1 )
                           ? 1
                           : ( uFlag < -1 || uFlag == -1 )
                           ? -1
                           : 0; 
                    
                }
                
            // <-- setFlagToSelectOnclick
                
                ,
                
            // --> toggleSelect, toggle selected elements and return this
                
                toggleSelect : function(){
                    
                    return this.each( function(){
                        
                        $( this ).toggleClass( config.selectors.selected );
                        
                    } );
                    
                }
                
            // <-- toggleSelect
                
                ,
                
            // --> unSelect, unselect some elements and return this
                
                unSelect : function(){
                    
                    return this.each( function(){
                        
                        $( this ).removeClass( config.selectors.selected );
                        
                    } );
                    
                }
                
            // <-- unSelect
                
                ,
                
            // --> unSelectAll, unselect all elements selected and return this
                
                unSelectAll : function(){
                    
                    return $I( "." + config.selectors.selected ).unSelect();
                    
                }
                
            // <-- unSelectAll
                
            }
            
        } // <-- tool
        
        ,
        
        { // --> handleListObj, list for all events bind in this plugin 
                        
            click : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
                switch( flag ){
                        
                    case -1 :
                        
                        $I( $this.parent() ).toggleSelect();
                        
                        break;
                        
                    case 1 :
                        
                        $I( $this.children() ).toggleSelect();
                        
                        break
                        
                    default :
                    
                        $I( $this ).toggleSelect();
                        
                }
                
                return false;
                
            }
            
            ,
            
            mouseover : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
                if( !$this.hasClass( config.selectors.worker ) )
                    $this.addClass( config.selectors.worker );
                    
                if( !$this.parent().hasClass( config.selectors.parentWorker ) )
                    $this.parent().addClass( config.selectors.parentWorker );
                
                return false;
                
            }
            
            ,
            
            mouseout : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
                $this.removeClass( config.selectors.worker );
                    
                $this.parent().removeClass( config.selectors.parentWorker );
                
                return false;
                
            }
            
        } // <-- handleListObj
    
    );
    
// <-- Install this tool
    
// --> UnInstall this tool
    
    $U.tools.uninstall( toolName, function(){
                
    // --> remove all signature
        
        $( "*" )
            .removeClass( config.selectors.selected )
            .removeClass( config.selectors.worker )
            .removeClass( config.selectors.parentWorker );
        
    // --> remove styles append
        
        $( "#" + config.selectors.styleID ).remove();
        
    } );
    
// <-- UnInstall this tool

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

            name        : "$.uite.tools.select",
            description : "Selector function for '$.uite' framework",
            version     : "1.0.0",
            author      : "Leonardo Ciaccio",
            contact     : "leonardo.ciaccio@gmail.com",
            project     : ""

        }
        
        ,
        
        selectors : {
            
            styleID      : "uite-select-style",
            selected     : "suite-selected",
            worker       : "suite-worker",
            parentWorker : "suite-parent-worker"
            
        }
        
        ,
        
        styles : ".suite-parent-worker{outline: 1px solid black!important;}.suite-selected{outline: 1px solid red!important;}.suite-worker{outline: 1px dashed grey!important;}.suite-parent-worker.suite-worker, .suite-selected.suite-worker{outline: 1px dashed red!important;-webkit-transition: outline-color .5s;transition: outline-color .5s;}"

    } // <-- Config
   
);
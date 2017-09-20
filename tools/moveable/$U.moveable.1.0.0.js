/*
    
    $.uite 2.0.0 extension, drag&drop, sortable function
    
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
        throw new Error( "$.uite.tools.moveable require '$.uite' framework" );
    
// --> Global vars
    
    var toolName = "moveable",
        cloned   = "",
        flag     = 0; // <-- 0 = sortable ; 1 = moveable
    
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
    

// --> handle for reset styles
    
    function _reset(){
        
        $( "*" )
            .removeClass( config.selectors.startDrag )
            .removeClass( config.selectors.todrag )
            .removeClass( config.selectors.todrop )
            .removeClass( config.selectors.toNotdrop )
            .removeClass( config.selectors.parentTodrop )
            .removeClass( config.selectors.parentNotdrop )
            .removeAttr( "draggable" );
        
    };
    
// --> Install and overwrite this tool name
    
    $U.tools.install( 
        
        { // --> tool, core of this plugin for $.uite framework
        
            badge : $.extend( {}, config.badge ),
            name  : toolName,
            fn    : {
                
                sortable : function(){
                    
                    flag = 0;
                    
                }
                
                ,
                
                moveable : function(){
                    
                    flag = 1;
                    
                }
                
            }
            
        } // <-- tool
        
        ,
        
        { // --> handleListObj, list for all events bind in this plugin 
                 
            click : function(){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
            // --> reset all style
                
                _reset();
                
            // --> set my style
                
                $this
                    .addClass( config.selectors.todrag )
                    .attr( "draggable", "true" );
                
            // --> if i am in moveable mode, esc
                
                if( flag == 1 )return false;
                
            // --> set parent not droppable style
                
                $this
                    .parent()
                    .addClass( config.selectors.parentNotdrop );
           
            // --> set parent child not droppable style but no me
                
                $this
                    .parent()
                    .children().not( "." + config.selectors.todrag )
                    .addClass( config.selectors.toNotdrop );
                
                return false;
                
            }
            
            ,
            
            dblclick : function(){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
            // --> reset all style
                
                _reset();
                
            // --> set parent style and draggable
                
                $this
                    .parent()
                    .addClass( config.selectors.todrag )
                    .attr( "draggable", "true" );
                
            // --> if i am in moveable mode, esc
                
                if( flag == 1 )return false;    
            
            // --> set parent parent not droppable style
                
                $this
                    .parent()
                    .parent()
                    .addClass( config.selectors.parentNotdrop );
           
            // --> set parent parent child not droppable style but no me
                
                $this
                    .parent()
                    .parent()
                    .children().not( "." + config.selectors.todrag )
                    .addClass( config.selectors.toNotdrop );
                
                return false;
                
            }
            
            ,
            
            dragstart : function( event ){
                
                var $this = $( event.target );
                
                if( !$this.hasClass( config.selectors.startDrag ) )
                    $this.addClass( config.selectors.startDrag );
                
                var $tmpD = $( "<div>" );       
                
                event.originalEvent.dataTransfer.setData( "Text", $tmpD.append( $this.clone() ).html() );
                
                cloned = $tmpD.html();
                
                $tmpD.remove();
                
            }
            
            ,
            
            dragenter : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this              = $( event.target ),
                    $selectorStartDrag = $( "." + config.selectors.startDrag );
                
            // --> sortable if not droppable
                
                if( 
                    $this.hasClass( config.selectors.toNotdrop ) 
                    
                    &&
                    
                    $this.parent().hasClass( config.selectors.parentNotdrop )
                    
                    &&
                    
                    flag == 0
                
                ){
                    
                    ( $this.prev( "." + config.selectors.startDrag ).length > 0 )
                    ? $this.insertBefore( $selectorStartDrag[ 0 ] )
                    : $this.insertAfter( $selectorStartDrag[ 0 ] )
                    ;
                    
                    return false;
                    
                }
            
            // --> repaint other way other way   
                
                if( 
                    flag == 1
                   
                    &&
                    
                    $this.parents( "." + config.selectors.startDrag ).length < 1
                    
                ){
                    
                // --> reset preview box
                    
                    $( "." + config.selectors.parentTodrop )
                        .removeClass( config.selectors.parentTodrop );
                
                    $( "." + config.selectors.todrop )
                        .removeClass( config.selectors.todrop );
                    
                // --> repaint
                    
                    $this
                        .parent()
                        .addClass( config.selectors.parentTodrop )
                        .children()
                        .addClass( config.selectors.todrop );
                    
                }
                                    
                return false;

            }
            
            ,
            
            dragend : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
            
            // --> reset all
                
                _reset();
                
            }
            
            ,
            
            drop : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this              = $( event.target ),
                    $selectorStartDrag = $( "." + config.selectors.startDrag );
                            
            // if have text for extern drop, append to
                
                try{
                    
                    var html = $.trim( event.originalEvent.dataTransfer.getData( "Text" ) );
                    
                    
                    if( html.length > 1 && html != cloned && flag == 1){
                        
                    // --> Simpli text ? then escape
                
                        if( !html.match( /^\</gi ) ){
                            
                            html = html
                                    .replace( /\</gi, "&lt;" )
                                    .replace( /\>/gi, "&gt;" )
                            
                            html = "<p>" + html + "</p>"; 
                            
                        }

                        //$this.parent().append( html );
                        $this.append( html );
                        
                    // --> Paranoid XD
                        
                        $U.tools[ toolName ].onService();
                        
                        return false; 
                        
                    }                
                    
                }catch( e ){
                    
                    alert( "mhhhh error on drop O.o" );
                    return false;
                    
                }
                
            // --> if i am a parent then append and i am in move mode
                
                if( 
                    flag == 0 
                    
                    || 
                    
                    $this.parents( "." + config.selectors.startDrag ).length > 0 
                    
                    || 
                    
                    $this.hasClass( config.selectors.startDrag ) 
                
                )return false
                
                $selectorStartDrag.remove()
                
                $this.append( cloned );
                
            }
            
            ,
            
            dragover : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                if( event.dataTransfer && event.dataTransfer.dropEffect )
                    event.dataTransfer.dropEffect = "move";

              return false;
                
            }
            
        } // <-- handleListObj
    
    );
    
// <-- Install this tool
    
// --> UnInstall this tool
    
    $U.tools.uninstall( toolName, function(){
                
    // --> remove all signature
        
        _reset();
        
    // --> remove styles append
        
        $( "#" + config.selectors.styleID ).remove();
        
    } );
    
// <-- UnInstall this tool
    
// --> Operation on change tools and this lost

    $U.tools.change( toolName, function(){
                
    // --> remove all signature
        
        _reset();
        
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

            name        : "$.uite.tools.moveable",
            description : "Moveable function for '$.uite' framework",
            version     : "1.0.0",
            author      : "Leonardo Ciaccio",
            contact     : "leonardo.ciaccio@gmail.com",
            project     : ""

        }
        
        ,
        
        selectors : {
            
            styleID       : "uite-moveable-style",
            startDrag     : "suite-move-start-drag",
            todrag        : "suite-move-todrag",
            todrop        : "suite-move-todrop",
            toNotdrop     : "suite-move-not-drop",
            parentTodrop  : "suite-move-parent-todrop",
            parentNotdrop : "suite-move-parent-not-drop"
            
        }
        
        ,
        
        styles : "[draggable] {cursor: move;-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;user-select: none;-khtml-user-drag: element;-webkit-user-drag: element;}.suite-move-start-drag{opacity: 0.4;}.suite-move-todrag{outline: 1px dashed grey!important;cursor: move;}.suite-move-todrop{outline: 1px dashed grey!important;}.suite-move-not-drop{outline: 1px dashed red!important;}.suite-move-parent-not-drop{outline: 3px dashed red!important;}.suite-move-parent-todrop{outline: 3px dashed black!important;}"

    } // <-- Config
   
);
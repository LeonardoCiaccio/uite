/*
    
    $.uite 2.0.0 extension, edit functions
    
    © Copyright Leonardo Ciaccio 2015/16
    leonado.ciaccio@gmail.com

    MIT license
    https://tldrlegal.com/license/mit-license
    
    **********************************************************************
    
    ( $.uite 2.0.0 )[ https://tldrlegal.com/license/mit-license ]

*/

( function( $U, $I, config, tools ){
    
    "use strict";
    
    if( !$U || !$I )
        throw new Error( "$.uite.tools.edit require '$.uite' framework" );
    
// --> Global vars
    
    var toolName = "edit";
        
// --> Install and overwrite this tool name
    
    $U.tools.install( 
        
        { // --> tool, core of this plugin for $.uite framework
        
            badge : $.extend( {}, config.badge ),
            name  : toolName,
            fn    : {
                
            // --> paste, append text to selected elements and return selected
                
                paste : function(){
                    
                // --> require select plugin                   
                    
                    if( !$U.tools.select || $I().selected().length < 1 )
                        return alert( "Please select one or more elements with '$U.tools.select' !" );
                    
                // --> get text and append to selected
                    
                    var $selected = $I().selected(),
                        text      = $.trim( prompt( "Paste here your code or text to append !" ) );
                    
                    if( !text || text.length < 1 )
                        return false;
                    
                    $I( $selected ).append( text );
                    
                // --> call on service for new elements
                    
                    $U.tools[ toolName ].onService();
                    
                    return $selected;                    
                    
                }
                
            // <-- paste
                
                ,
                
            // --> copy, copy selected elements to clipboard
                
                copy : function(){
                    
                // --> require select plugin
                    
                    if( !$U.tools.select || $I().selected().length < 1 )
                        return alert( "Please select one or more elements with '$U.tools.select' !" );
                    
                // --> unselect and copy to clipboard  
                    
                    var $selected = $I().selected();                    
                      
                    $I( $selected ).unSelect();
                    
                    $I( $selected ).toClipBoard();
                    
                    
                }
                
            // <-- copy
                
                ,
                
            // --> clone, clone and appen after selected elements
                
                clone : function(){
                    
                // --> require select plugin
                    
                    if( !$U.tools.select || $I().selected().length < 1 )
                        return alert( "Please select one or more elements with '$U.tools.select' !" );
                    
                // --> unselect and clone clone  
                    
                    var $selected = $I().selected();                    
                      
                    $I( $selected )
                        .unSelect()
                        .each( function(){
                            
                            $( this ).clone().insertAfter( $( this ) );
                        
                    } );
                    
                // --> onservice for new element and return selected
                    
                    $U.tools[ toolName ].onService();
                    
                    return $selected;
                    
                }
                
            // <-- clone
                
                ,
            
            // --> toClipBoard, text to clipboard
                
                toClipBoard : function( text ){
                    
                    text = text || "";
                    text = $.trim( text );
                    
                // --> concat all elements
                    
                    var $tmpD = $( "<div>" );
                    
                    this.each( function(){
                        
                        $tmpD.append( $( this ).clone() );
                        
                    } );
                    
                    text+= $tmpD.html();
                    $tmpD.remove();
                    
                // --> copy to clipboard
                    
                    var $tempT = $( "<textarea>" );
                    $tempT.height( "1px" ).width( "1px" );
                    
                    $( "body" ).append( $tempT );
                    
                    $tempT.val( text ).select();
                    
                    document.execCommand( "copy" );
                    
                    $tempT.remove();

                    return this;    
                    
                }
                
            // <-- toClipBoard
                
                ,
                
            // --> grab, grab all computed styles of elements
                
                grab : function(){
                    
                // --> require select plugin
                    
                    if( !$U.tools.select || $I().selected().length < 1 )
                        return alert( "Please select one or more elements with '$U.tools.select' !" );
                    
                // --> unselect and grab all computed style  
                    
                    var $selected = $I().selected();                    
                
                // --> check if selected have a tasks and clean up
                    
                    var $selTasks = $selected.find( "[data-task]" );
                    if( $selTasks.length > 1 )
                        if( !confirm( "Selected elements have a tasks, grabber remove all tasks for this session, proceed ?" ) )
                            return $selected;
                    
                    $I().allTask().remove();
                    
                    $I( $selected ).unSelect().removeAttr( "contenteditable" );
                    
                    $selected.find( "*" ).removeAttr( "contenteditable" );
                    
                // --> require a little delay for render all elements
                    
                    setTimeout( function(){
                        
                        // --> signature and styles
                    
                        var styleSign = "/* --> grabbed --> */";

                    // --> setup all styles selected and child

                        $selected.each( function(){

                            var oldStyle = $.trim( $( this ).attr( "style" ) );
                            if( oldStyle.length > 1 ){

                                if( oldStyle.indexOf( styleSign ) > -1 )return true; // <-- signed, continue

                                if( oldStyle.substr( oldStyle.length - 1, 1 ) != ";" )
                                    oldStyle+= ";"

                            }

                            oldStyle+= styleSign;

                            $( this ).attr( "style", oldStyle + tools.getAllStyles( $( this )[ 0 ] ) );

                        } );

                        $selected.find( "*" ).each( function(){

                            var oldStyle = $.trim( $( this ).attr( "style" ) );
                            if( oldStyle.length > 1 ){

                                if( oldStyle.indexOf( styleSign ) > -1 )return true; // <-- signed, continue

                                if( oldStyle.substr( oldStyle.length - 1, 1 ) != ";" )
                                    oldStyle+= ";"

                            }

                            oldStyle+= styleSign;

                            $( this ).attr( "style", oldStyle + tools.getAllStyles( $( this )[ 0 ] ) );

                        } );

                    // --> copy all selected

                        var $tmpD      = $( "<div>" ),
                            concatHtml = $tmpD.append( $selected.clone() ).html();

                        $tmpD.remove();

                    // --> remove style attribute to selected

                        $selected.each( function(){

                            var oldStyle = $.trim( $( this ).attr( "style" ) );
                            if( oldStyle.length > 1 )
                                if( oldStyle.indexOf( styleSign ) < 0 )return true; // <-- continue

                            oldStyle = oldStyle.split( styleSign )[ 0 ];

                            $( this ).attr( "style", oldStyle );

                        } );

                        $selected.find( "*" ).each( function(){

                            var oldStyle = $.trim( $( this ).attr( "style" ) );
                            if( oldStyle.length > 1 )
                                if( oldStyle.indexOf( styleSign ) < 0 )return true; // <-- continue

                            oldStyle = oldStyle.split( styleSign )[ 0 ];

                            $( this ).attr( "style", oldStyle );

                        } );

                    // --> restore all events for selected

                        $U.tools[ toolName ].onService();

                    // --> open grabbed in new window

                        var page = window.open( "data:text/plain;charset=utf-8," + encodeURIComponent( concatHtml ) );  
                        
                    }, 2000 );
                    
                // --> return selected
                    
                    return $selected;
                    
                    
                }
                
            // <-- grab
                
                ,
            
            // --> hide, sign this element with task index and hide
                
                hide : function(){
                    
                // --> require select plugin
                    
                    if( !$U.tools.select || $I().selected().length < 1 )
                        return alert( "Please select one or more elements with '$U.tools.select' !" );
                    
                // --> unselect and send to task 
                    
                    var $selected = $I().selected();                   
                    
                    $I( $selected ).unSelect();
                        
                    $I( $selected ).toTask();
                    
                }
                
            // <-- hide
                
                ,
                
            // --> remove, erase an element
                
                remove : function(){
                    
                // --> require select plugin
                    
                    if( !$U.tools.select || $I().selected().length < 1 )
                        return alert( "Please select one or more elements with '$U.tools.select' !" );
                    
                // --> remove
                    
                    if( confirm( "I suggest you to 'hide' this, if removed can't undo this operation, remove this element ?" ) )
                        $I().selected().remove();
                    
                }
                
            // <-- remove
                
                ,
                
            // --> toTask, hide some elements for undo task
                
                toTask : function(){
                    
                    var $allTasks    = $I().allTask(),
                        currentTasks = ( $allTasks.length > 0 ) ? $allTasks.length : 0 ;
                    
                    return this.each( function(){
                        
                        if( !$( this ).attr( "data-task" ) )
                            $( this ).attr( "data-task", currentTasks++ ).hide();
                        
                    } );
                    
                }
                
            // <-- toTask
                
                ,
                
            // --> undoLastTask, restore last hidden task
                
                undoLastTask : function(){
                    
                    var $allTasks    = $I().allTask(),
                        currentTasks = ( $allTasks.length > 0 ) ? $allTasks.length - 1 : 0 ;
                    
                    return $( "[data-task='" + currentTasks + "']" )
                                .removeAttr( "data-task" )
                                .show();
                    
                }
                
            // <-- undoLastTask
                
                ,
                
            // --> undoAllTasks, restore all hidden task
                
                undoAllTasks : function(){
                    
                    var $allTasks    = $I().allTask();
                    
                    return $allTasks
                                .removeAttr( "data-task" )
                                .show();
                    
                }
                
            // <-- undoAllTasks
                
                ,
                
            // --> allTask, return all hidden task
                
                allTask : function(){
                    
                    return $( "[data-task]" );
                    
                }
                
            // <-- allTask
                
            }
            
        } // <-- tool
        
        ,
        
        { // --> handleListObj, list for all events bind in this plugin 
                        
            dblclick : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
                $this.attr( "contenteditable", "true" ).focus();
                
            }
            
            ,
            
            blur : function( event ){
                
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $( event.target );
                
                $this.removeAttr( "contenteditable" );
                
            }
            
        } // <-- handleListObj
    
    );
    
// <-- Install this tool
    
// --> UnInstall this tool
    
    $U.tools.uninstall( toolName, function(){
    
    // --> Information for task
        
        var $allTasks = $I().allTask();
        
        if( $allTasks.length > 0 )
            if( !confirm( "If you close this session remove all hidden task, continue ?" ) )
                return false;
        
    // --> remove all signature and all tasks
        
        $( "*" ).removeAttr( "contenteditable" );
        
        $allTasks.remove();
        
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

            name        : "$.uite.tools.edit",
            description : "Edit functions for '$.uite' framework",
            version     : "1.0.0",
            author      : "Leonardo Ciaccio",
            contact     : "leonardo.ciaccio@gmail.com",
            project     : ""

        }

    } // <-- Config
    
    , 
    
    { // --> Tools
        
        getAllStyles : function( dom ){
        
        // --> styles concat prop:value;prop:value;
            
            var styles = window.getComputedStyle( dom, null ),
                all    = "",
                len    = styles.length;
                        
            for( var i = 0; i < len; i++ ){
                
                var prop = styles[ i ],
                    val  = styles.getPropertyValue( prop );
                
                if( val )
                    all+= prop + ":" + val + ";";
            
            }
            
            return all;
            
        }
        
    } // <-- Tools
   
);
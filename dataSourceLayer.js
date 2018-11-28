/**
 * The plascua datasource library helps in analyzing and collecting all user events including keystrokes and mouse dynamics from various sensors. e.g Mouse, Keyboard and Accelerometer.
 * The module works inline with the Events Track API which records the events.
 * @author Julius Muganji & Dr. Engineer Bainomugisha
 * @copyright (c) 2018 Makerere University
 * @name Plascua Datasource Library.
 * @license Released under the Makerere University License
 */
//require('./evtrack-master/js/src/tracklib');
const track = require('./evtrack-master/js');
/**
     * The trimming function that removes and replaces all the commas with space in a string..
     * e.g parm = "x,y,u,z" invoking the function trimString(parm); returns "x y u z".
     * @param parm must be a string e.g "a,b,c,d,e";
     * @returns parm holds the processed string.
     */
    function trimString(parm){
        //var val = new String;
        if (typeof parm == 'string' || typeof parm.length !==0){
            parm = parm.replace(/,/g, ' ');
        }
        return parm;
    }
    function errorhandling(_errorMessage,_errorObject){
        console.log(_errorMessage,_errorObject);
    }
    /**
     * convertArrayToString function takes in an array as a parameter and returns converted string.
     * @param _array must be an array object e.g ["admin,wat,go,why"].
     * @returns returns a string from a string.
     */
   function convertArrayToString(error,_array){
       let arrayToString = '';
       if(error){
           console.log('Invalid input at',_array);
           return;
       }
       if(typeof !Array.isArray(_array)){
           throw new Error(error);
        }
       arrayToString = _array.toString();
       return arrayToString;

   }
   /**
    * stringToArray function takes in a string as a parameter and returns an array.
    * @param _string must be a string e.g "a,b,c,d,e".
    * @returns result holds the converted array from a string.
    */
   function stringToArray(error,_string){
       if (error){
           console.log('The supplied input must be a string at',_string);
           return;
       }
       let _result = '';
       if(typeof _string !=='string' && typeof _string.length ==0){
           throw new Error(error);
        } 
        _result = [_string.toString()];
        return result;
   }
    /**
     * Here we define the events that we are targeting on a specific sensor....
     * E.g var sensorEvents = "keydown, keyup, keypress".
     * Then we invoke the function like this sensorConvertToArray(sensorEvents);
     * The function returns an array object containing various elements of events.
     * @param sensorEvents is a list containing all events to be captured.
     * @returns returns sensorEvents separated with spaces not commas.
     */
    function sensorConvertToString(error,sensorEvents){
        if(typeof sensorEvents !==undefined || typeof sensorEvents =='string' || typeof sensorEvents.length !==0){
            sensorEvents = trimString(sensorEvents);
        }
        if (Array.isArray(sensorEvents)){
            sensorEvents = trimString(convertArrayToString(sensorEvents));
        }
        return sensorEvents;
    }
    /**
     * The recordSensorEvents takes in an object with four properties assigned with values.
     * The obj is supplied to the Trackui.record method in the Trackui api to listen and record events.
     * @event regularEvents or pollingEvents takes in a string of events to be recorded e.g "keypress,keydown,keyup" else uses the wild symbol by default to listen to all events as defined in the api.
     * @param obj = {debug:true,postInterval: 0,regularEvents:"",pollingEvents:""postServer: "../evtrack/save.php" ,};
     * @param error for catching exceptions when recording events.
     */
    function recordSensorEvents(error,obj){
        if(error){
            console.log('The supplied parameter must be an object');
            return;
        }
        if(typeof obj !=='object'){
            throw (new Error(error));
        }
        // Initializing an Recording API....
       var trackui = new trackui();
       // The recording of user events gets started when an object containing various configurations is supplied...
       trackui.record(obj);
    }
    
/*!
 * sensorDataRecorder.js v1.0.0
 * Author: Julius Muganji & Dr. Engineer Bainomugisha
 * (c) 2018 Makerere University
 * Released under the Makerere University License.
 */
/**
 * @author Julius Muganji & Dr. Engineer Bainomugisha
 * @copyright (c) 2018 Makerere University
 * @name plascua Library.
 * @license Released under the Makerere University License
 */
//Here we initiate the dynamic time warping need for classification of users.
const dtw = require('./dtw');
// A complete library that is fully reloaded with all the supervised machine learning algorithms.
const ml = require('./ml');
// The jquery library contains all basic functions that are required for the fully functioning of the language.
const jquery = require('./jquery');
// The papaparse library is to be used inline with the csv data to interswitch from array to csv and from csv to array .
const papaparse = require('./papaparse');
// We import the events recording API.
const fs = require('./file-system/file-system')
//require('./evtrack-master/js/src/tracklib');
const track = require('./evtrack-master/js/src/trackui');
const stream  = require('./streamjs');
//require('./evtrack-master/js/src/json2');
//require('./evtrack-master/js/src/load');

/* We wrap up all the events and other continuous processes into one global environment. */
/**
 * Must initialize the plascua instance. e.g var plascua = new plascua();
 */
function plascua(){
	this.startedAt = 0;
    this.finishedAt = 0;
    this.userBiometricdata = [];
	this.recording = false;
	
}
dataSource = {
    
    // Reading inputsource from server or local directory
    readCsvFile:function(path,callback){
        // A boolean variable to manage how CSVfiles are to be read.
        var streaming=false;
        if(typeof path !==URL && typeof path.URL ==null || typeof path.length==0){
            throw (new Error(path));
        }
        if(!streaming){
            papaparse.parse(path,
                {download: true,trimHeaders: true,
                step:function(row){
                    let result = row.data;
                    // initiate a callback function to process the data....
                    if(typeof !callback =='function' || typeof callback =='undefined'){return;}
                    return result;

                },
                complete:function(){
                    console.log('Done streaming the file...');
                }
            });
            streaming=false;
            return;
        }
        papaparse.parse(path,{trimHeaders: true,
        });
        streaming=true;
        return;
        },
    /**
     * 
     */
    

    
};
 // Abstraction at the machine learning layer
trainingUserModel = {
    //Extracting user details from raw data....
    featureExtraction:function(data){
        papaparse.parse(parm1,{download:true,
        step:function(row){
            console.log("Row:",row.data);

        },
        complete:function(){
            console.log("All done...");

        }
    })
        var features =[];
        /**
         * timeStampDifferences returns the differences between of varrying time series.
         * @param _data an array containing various user biometric data.
         * @param datatype e.g mouse, keyboard, accelerometer.
         * @returns 
         */
        function timeStampDifferences(_data,datatype){
            if(typeof !Array.isArray(_data) || _data.length ==0){
                throw new(Error());
            }
           if(typeof datatype =='undefined' || typeof datatype.length ==0){
               throw new(Error());
           }

            
        };
        var allRows = data.split('/\r\n|\n/');
        for(var i=0;i<allRows.length;i++){
            var k = line[i].split(',');
            features.push(k);

        }
        

        return;
    },
    /**
     * 
     */
    trainingUserModel:function(_userBiometricdata,callback){
        // A predicate function that checks whether the supplied input is of an array format.
        // The length function checks to see whether the supplied input contains an element in it.
        if(typeof _userBiometricdata.length!==0 && !Array.isArray(_userBiometricdata)){
            // We then convert the supplied input to an array.
            stringToArray(_userBiometricdata);
            return _userBiometricdata;

        }
        var testdata,trainData =[];
        // We slice the dataset by a percentage of 80:20 where the train data takes the 80% and the 20% for test data.
        trainData.push(_userBiometricdata[:80]);
        testdata.push(_userBiometricdata[20:]);
        if(typeof callback !=='function'){
            throw new(Error());
            return;
        }
        callback.apply(this,arguments);

    },
    /**
     * 
     */
    sliceByPercentage:function(){

    }

};

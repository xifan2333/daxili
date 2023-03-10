interface aardioExternal {  
    chooseLogo():Promise<string>; 
    chooseCover():Promise<string>; 
    chooseAudio():Promise<string>;
    saveConfig(string,string,string):Promise<string>;  
    chooseTextPath():Promise<string>; 
    chooseImageDir():Promise<string>; 
    updateQuestion(string,string):Promise<string>; 
    hasQuestion():Promise<boolean>;
    goToTextQuestion(number):Promise<string>; 
    goToImageQuestion(number):Promise<string>;
    last():Promise<string> 
    next(string):Promise<string>
    fetchDataDetail():Promise<string>
    clearUsedData():Promise<string>
}

declare var aardio: aardioExternal
 
class ServerConstants {
   constructor() {
      this.mode = "DEBUG";
   }
}

class SharedConfig{
   constructor(){
      this.server_endpoint = "http://localhost:8080";
      this.code_upload_endpoint = "/api/uploadCode";
   }

   get CodeUploadEndpoint(){
      return this.server_endpoint + this.code_upload_endpoint;
   }
}

class DebugConfig extends SharedConfig {
   constructor() {
      super();
   }
}

class ReleaseConfig extends SharedConfig {
   constructor() {
      super();
   }
}

class ConfigManager {

   static getConfig() {
      const constants = new ServerConstants();
      if(constants.mode === "DEBUG"){
         return new DebugConfig();
      }
      else{
         return new ReleaseConfig();
      }
   }
}

export { ConfigManager };
export default ConfigManager;
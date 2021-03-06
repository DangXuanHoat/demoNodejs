import fs from 'fs'
export default class Router{
    constructor(app){
        if (!!Router.instance) {
            return Router.instance;
        }
        this.app = app
        this.dir = './app/routes/'
        Router.instance = this;
        return this;
    }
   getRouter(){
     return this.routers
   }
   setDir(dir =""){
       this.dir = './app/routes/'+dir
   }
   getDir(){
       return this.dir
   }
    async build(prefix=""){
        this.listRoute = new Array()
        let list = await this.mapRoutes('./app/routes',undefined)
        for (const item of list) {
            let link = item.replace('./app/routes', "")
            try {
                let r = link.split('.')
                error(r)
                if(r[2]!='js'){
                    this.app.use(`${prefix+r[1]}`,(await import(link)).default)
                    this.listRoute.push(prefix+r[1])
                }else{
                    
                }
                
                //
            } catch (e) {
               error(e,link)
            }
        }
    }
    async redirectDefault(pathDefault){
        this.app.use('/',(req,res)=>{
           return res.redirect(pathDefault)
        })
    } 
    async mapRoutes(dir, list_files) {
        list_files = list_files || [];
        var files = fs.readdirSync(dir);
        for (var i in files){
            if(files[i] == "router.js") continue;
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
            this.mapRoutes(name, list_files);
            } else {
                list_files.push(`.${name}`);
            }
        }
        return list_files;
    }
    async defaultErrorAPI(data){
        this.app.use(`${process.env.PREFIX}/api/*`,(req,res)=>{
            return res.status(404).json({
                "errors": [
                  {
                      "id": "1",
                      "status": 404,
                      "code": "Not Found",
                      "message": "The requested route does not exist"
                  }
              ]
              })
        })
    }
    getWebPrefix (){
        return this.webPrefix ||""
    }
    async defaultErrorWeb(data){
        this.webPrefix = `${process.env.PREFIX}/web`
        this.app.use(`${this.webPrefix}/*`,(req,res)=>{
            try {
                return res.render("page/error",{
                    layout: "layouts/error-layout",
                    error: {
                        code: "404",
                        title: "Trang kh??ng t???n t???i!",
                      }
                });
            } catch (error) {
                return res.render("<p>Trang kh??ng t???n t???i!</p>");   
            }
            
        })
    }
}

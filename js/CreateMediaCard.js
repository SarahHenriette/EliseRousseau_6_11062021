class CreateMediaCard {
    constructor(data, namePhotographe){
        this.dataMedia = data
        if(this.dataMedia.image){
            new ImageMedia(namePhotographe, data)
            
        }else if(this.dataMedia.video) {
            new VideoMedia(namePhotographe, data)
        }
    }
}



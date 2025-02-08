import mongoose, { model, Schema , models } from "mongoose";
import bcrypt from "bcryptjs";


export const VIDEO_DIMENSION = {
    width : 1080,
    height : 1920,
}as const
export interface IVideo {
    title : string;
    description : string;
    _id? : mongoose.Types.ObjectId;
    videoUrl : String,
    thumbnailUrl : String ,
    controls? : boolean,
    createdAt? : Date;
    updatedAt? : Date;
    transformation? : {
        height : number,
        width : number,
        quality? : number,
    }

}

const videoSchema =  new Schema<IVideo>({
    title : {
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true,
    },
    videoUrl : {
        type : String,
        required : true,
    },
    thumbnailUrl : {
        type : String,
        required : true,
    },
    controls : {
        type : Boolean,
        default : false,
    },
    transformation :{
        height : {
            type : Number,
        default : VIDEO_DIMENSION.height,
        },
        width : {
            type : Number,
            default : VIDEO_DIMENSION.width,
        },
        quality:{
            type : Number,
            min: 1,
            max: 100,
        }
        

    }
},{timestamps : true})

const Video = models?.Video ||  model<IVideo>("Video", videoSchema);

export default Video ;